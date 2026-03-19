import { queryOptions } from "@tanstack/react-query";
import { getMe, getUserSubscription } from "../api/api";

export function userQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user"],
            queryFn: () => getMe()
        },    
    );
};

export function userSubscriptionQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user_subscription"],
            queryFn: () => getUserSubscription()
        }
    )
};