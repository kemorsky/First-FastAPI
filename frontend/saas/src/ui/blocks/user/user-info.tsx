import { useQuery } from "@tanstack/react-query";
import usePayment from "../../../hooks/usePayment";
import { userQueryOptions, userSubscriptionQueryOptions } from '../../../queries/userQueryOptions';
import { UserInfoCard } from "../../components/cards/user-info-card";
import { UserSubscriptionCard } from "../../components/cards/user-subscription-card"
import { Button } from "../../shared/buttons"
import type { UserSubscription } from "../../../types/types";
import Container from "../../shared/container";
import Wrapper from "../../shared/wrapper";
export const UserInfo = () => {
    const { handleCancelSubscription } = usePayment();
    const { data: user } = useQuery(userQueryOptions());
    const { data: user_subscription } = useQuery({
        ...userSubscriptionQueryOptions(),
        enabled: !user
    });

    if (!user || !user_subscription) return console.log("Fetching user and user subscription...");

    console.log(user_subscription);
    console.log(user);

    const user_past_subscriptions: UserSubscription[] = user.purchases.filter(purchase => purchase.status === "canceled") || [];
    console.log(user_past_subscriptions);
    
    // TODO - refresh user and user subscription upon changes in data
    // when passed to UserInfoCard and UserSubscriptionCard

    return (
        <Wrapper>
            <Container>
                <div className="w-full flex justify-between">
                    <div className="w-full flex flex-col items-start gap-6">
                        <UserInfoCard {...user} />
                    </div>
                    <UserSubscriptionCard {...user_subscription}>
                        <Button className="self-end" onClick={() => {handleCancelSubscription()}} text="Cancel" />
                    </UserSubscriptionCard>
                    <div>
                        {user_past_subscriptions?.map((sub) => {
                            return (
                                <article key={sub.id}>
                                    <p>
                                        {sub.plan.name}
                                    </p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </Wrapper>
    )
}