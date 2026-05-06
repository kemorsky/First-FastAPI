import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import usePayment from "../../../hooks/usePayment";
import { userBillingHistoryQueryOptions, userQueryOptions, userSubscriptionQueryOptions } from '../../../queries/userQueryOptions';
import { UserInfoCard } from "../../components/cards/user-info-card";
import { UserSubscriptionCard } from "../../components/cards/user-subscription-card"
import { Button } from "../../shared/buttons"
import type { UserSubscription } from "../../../types/types";
import Container from "../../shared/container";
import Wrapper from "../../shared/wrapper";
import BillingCard from "../../components/cards/billing-card";
import BillingTable from "./billing-table";
export const UserInfo = () => {
    const { handleCancelSubscription } = usePayment();
    const { data: user, isLoading: isUserLoading } = useQuery(userQueryOptions());
    const { data: user_subscription } = useQuery({
        ...userSubscriptionQueryOptions(),
        enabled: !user
    });
    const { data: billing, isLoading: isBillingLoading } = useQuery(userBillingHistoryQueryOptions())

    if (!user || !billing || !user_subscription || isUserLoading || isBillingLoading) return <div className="w-40 h-40 bg-blue-200">Loading...</div>;

    console.log(user);
    console.log(billing)

    // const user_past_subscriptions: UserSubscription[] = user.purchases.filter(purchase => purchase.status === "canceled") || [];
    // console.log(user_past_subscriptions);
    
    // TODO - refresh user and user subscription upon changes in data
    // when passed to UserInfoCard and UserSubscriptionCard

    // TODO - change UI logic when subscription is missing to prevent constant 500's
    // and display basic user information

    return (
        <Wrapper>
            <Container>
                <div className="w-full flex justify-between">
                    <div className="w-full flex flex-col items-start gap-6">
                        <Suspense fallback={<div className="bg-gray-600 w-full max-w-120 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start" />}>
                            <UserInfoCard {...(user ?? {})} />
                        </Suspense>
                    </div>
                    
                    <div className="w-full max-w-240 flex flex-col items-start gap-6">
                        <UserSubscriptionCard {...(user_subscription ?? {})}>
                            <Button className="self-end" onClick={() => {handleCancelSubscription()}} text="Cancel" />
                        </UserSubscriptionCard>

                        <div className="bg-gray-600 w-full max-w-240 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
                            <section className="flex justify-center items-start gap-3">
                                <p className="text-[1.125rem] font-semibold">Billing History</p>
                            </section>
                            <hr className="text-black w-full h-1"/>
                            <BillingTable>
                                {billing.invoices.map((invoice) => (
                                    <BillingCard key={invoice.id} 
                                        date={invoice.date} 
                                        amount_paid={invoice.amount_paid}
                                        currency={invoice.currency}
                                        description={invoice.description}
                                        status={invoice.status}
                                        hosted_invoice_url={invoice.hosted_invoice_url}
                                    />
                                ))}
                                
                            </BillingTable>
                            <p>{billing.payment_method?.brand}</p>
                            <p>{billing.payment_method?.last4}</p>
                            <p>{billing.payment_method?.exp_month}</p>
                            <p>{billing.payment_method?.exp_year}</p>
                        </div>
                    </div>
                    
                </div>
            </Container>
        </Wrapper>
    )
}