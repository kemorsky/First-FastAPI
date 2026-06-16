import { Suspense } from "react";
import { UserInfoCard } from "../../components/cards/user-info-card";
import { UserSubscriptionCard } from "../../components/cards/user-subscription-card"
import Container from "../../shared/container";
import Wrapper from "../../shared/wrapper";
import BillingTable from "./billing-table";
import UserInfoCardSkeleton from "../../skeletons/user-info-card-skeleton";
import useAuth from "../../../hooks/useAuth";
import HorizontalRule from "../../shared/horizontal-rule";

export const UserInfo = () => {
    const { user, isPending } = useAuth();
    // TODO - refresh user and user subscription upon changes in data
    // when passed to UserInfoCard and UserSubscriptionCard

    return (
        <Wrapper className="bg-bg">
            <Container>
                <div className="w-full max-w-225 mx-auto flex flex-col justify-between gap-6">
                    <div className="flex items-start justify-between">
                        {isPending || !user ? ( 
                            <UserInfoCardSkeleton />
                        ) : (
                            <UserInfoCard user={user}/> 
                        )}
                        <Suspense fallback={<UserInfoCardSkeleton />}>
                            <UserSubscriptionCard />
                        </Suspense>

                    </div>
                    
                    <div className="w-full flex justify-end items-end">
                        <div className="w-full max-w-240 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start self-end">
                            <section className="flex justify-center items-start gap-3">
                                <p className="text-[1.25rem] font-secondary font-semibold text-text">Billing History</p>
                            </section>
                            <HorizontalRule />
                            <Suspense fallback={<UserInfoCardSkeleton />}>
                                <BillingTable />
                            </Suspense>
                        </div>
                    </div>
                    
                </div>
            </Container>
        </Wrapper>
    )
}