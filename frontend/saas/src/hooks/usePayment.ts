import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryOptions, userSubscriptionQueryOptions } from "../queries/userQueryOptions";
import { cancelSubscription, createCheckoutSession } from "../api/api";

export default function usePayment() {
    const queryClient = useQueryClient();
    
    const { mutate: mutateCancelSubscription } = useMutation({ mutationFn: () => cancelSubscription(),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: userSubscriptionQueryOptions().queryKey})
                },
                // onError: (error: Error) => { TODO - setup error handling later
                //     showToastError(error.message);
                // }
            });

    const { mutate: mutateCreateCheckoutSession } = useMutation({ mutationFn: ({plan_id}: {plan_id: number}) => createCheckoutSession(plan_id),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: userQueryOptions().queryKey})
                },
                // onError: (error: Error) => {
                //     showToastError(error.message);
                // }
            });

    const handleCancelSubscription = async () => {
        mutateCancelSubscription();
    }

    const handleCreateCheckoutSession = async (plan_id: number) => {
        mutateCreateCheckoutSession({ plan_id });
    }

    return {
        handleCancelSubscription,
        handleCreateCheckoutSession
    }
}