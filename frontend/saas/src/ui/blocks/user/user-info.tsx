import { Suspense } from "react";
import { UserInfoCard } from "../../components/cards/user-info-card";
import { UserSubscriptionCard } from "../../components/cards/user-subscription-card"
import Container from "../../shared/container";
import Wrapper from "../../shared/wrapper";
import BillingTable from "./billing-table";
import UserInfoCardSkeleton from "../../skeletons/user-info-card-skeleton";

export const UserInfo = () => {
    // TODO - refresh user and user subscription upon changes in data
    // when passed to UserInfoCard and UserSubscriptionCard

    return (
        <Wrapper>
            <Container>
                <div className="w-full flex justify-between">
                    <div className="w-full flex flex-col items-start gap-6">
                        <Suspense fallback={<UserInfoCardSkeleton />}>
                            <UserInfoCard />
                        </Suspense>
                    </div>
                    
                    <div className="w-full max-w-240 flex flex-col items-start gap-6">
                        <Suspense fallback={<UserInfoCardSkeleton />}>
                            <UserSubscriptionCard />
                        </Suspense>

                        <div className="bg-gray-600 w-full max-w-240 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
                            <section className="flex justify-center items-start gap-3">
                                <p className="text-[1.125rem] font-semibold">Billing History</p>
                            </section>
                            <hr className="text-black w-full h-1"/>
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