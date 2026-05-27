import { queryOptions } from "@tanstack/react-query";
import { getBillingHistory, getMe, getUserSubscription } from "../api/api";

export function userQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user"],
            queryFn: () => getMe(),
            staleTime: 30 * 60 * 1000,
            retry: false,
        },    
    );
};

export function userSubscriptionQueryOptions() {
    return queryOptions(
        {
            queryKey: ["user_subscription"],
            queryFn: () => getUserSubscription(),
            staleTime: 30 * 60 * 1000,
        }
    )
};

export function userBillingHistoryQueryOptions() {
    return queryOptions(
        {
            queryKey: ["billing"],
            queryFn: () => getBillingHistory(),
            staleTime: 30 * 60 * 1000,
            retry: 1,
            retryDelay: 2000
        }
    )
};