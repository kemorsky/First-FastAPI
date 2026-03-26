import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueryOptions, userSubscriptionQueryOptions } from '../../../queries/userQueryOptions';
import { UserInfoCard } from "../../components/cards/user-info-card";
import { UserSubscriptionCard } from "../../components/cards/user-subscription-card"
import { Button } from "../../shared/buttons"
export const UserInfo = () => {
    const queryClient = useQueryClient()

    const { data: user } = useQuery(userQueryOptions());
    const { data: user_subscription } = useQuery({
        ...userSubscriptionQueryOptions(),
        enabled: !user
    });

    if (!user || !user_subscription) return null

    console.log(user_subscription)

    return (
        <div className="w-full flex justify-between">
            <div className="flex flex-col items-start gap-6">
                <h1>User Info</h1>
                <UserInfoCard {...user} />
            </div>
            <UserSubscriptionCard {...user_subscription}>
                <Button text="Cancel" />
            </UserSubscriptionCard>
        </div>
    )
}