import { queryOptions } from "@tanstack/react-query";
import { getBillingHistory, getMe, getUserSubscription } from "../api/api";

export function userQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user"],
            queryFn: () => getMe(),
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 2000
        },    
    );
};

export function userSubscriptionQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user_subscription"],
            queryFn: () => getUserSubscription(),
            staleTime: 5 * 60 * 1000,
            // enabled: false,
        }
    )
};

export function userBillingHistoryQueryOptions() {
    return queryOptions(
        {
            queryKey: ["billing"],
            queryFn: () => getBillingHistory(),
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 2000
        }
    )
};