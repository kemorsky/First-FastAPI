import { queryOptions } from "@tanstack/react-query";
import { getMe, getUserSubscription } from "../api/api";

export function userQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user"],
            queryFn: () => getMe(),
            staleTime: 5 * 60 * 1000,
            retry: false
        },    
    );
};

export function userSubscriptionQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user_subscription"],
            queryFn: () => getUserSubscription(),
            staleTime: 5 * 60 * 1000,
            enabled: false
        }
    )
};