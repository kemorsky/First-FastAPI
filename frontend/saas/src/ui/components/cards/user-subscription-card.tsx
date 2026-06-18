import { Activity } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userSubscriptionQueryOptions } from "../../../queries/userQueryOptions";
import { Button } from "../../shared/buttons";
import usePayment from "../../../hooks/usePayment";

export const UserSubscriptionCard = () => {
    const { handleCancelSubscription } = usePayment();
    
    const { data: user_subscription, error  } = useSuspenseQuery({
        ...userSubscriptionQueryOptions(),
    });

    if (!user_subscription) return console.log("User subscription not found" + error?.message);

    const datePeriodStart = new Date(user_subscription.current_period_start);
    const datePeriodEnd = new Date(user_subscription.current_period_end);

    return (
        <>
            <Activity mode={!user_subscription ? "visible" : "hidden"}>
                <div className="bg-gray-600 w-full max-w-120 gap-4 rounded-2xl flex flex-col items-start justify-start">
                    <section className="flex justify-center items-start gap-3">
                        <p className="text-[1.125rem] font-semibold">{error?.message}</p>
                    </section>
                </div>
            </Activity>
            
            <Activity mode={user_subscription ? "visible" : "hidden"}>
                <div className="w-full max-w-80 gap-4 rounded-2xl flex flex-col items-start justify-start">
                    <p className="text-[1.25rem] font-secondary text-text font-semibold">Current Subscription</p>
                    
                    {user_subscription.id === 0 && (
                        <article className="text-left">
                            <p className="mb-2">Status: {user_subscription.status.charAt(0).toUpperCase() + user_subscription.status.slice(1)}</p>
                        </article>
                    )}
                    
                    {user_subscription.id > 0 && (
                        <article className="w-full max-w-80 text-left text-text self-center">
                            <section className="w-full flex items-center justify-between gap-4 text-text">
                                <article className="">

                                
                                    <p className="flex flex-col gap-1 items-start font-secondary mb-4">
                                        <label className="text-[0.875rem] font-semibold ">Plan</label>
                                        <span className="text-[1rem] font-medium ">{user_subscription.plan.name}</span>
                                    </p>
                                    <p className="flex flex-col gap-1 items-start font-secondary mb-4">
                                        <label className="text-[0.875rem] font-semibold ">Subscription Created</label>
                                        <span className="text-[1rem] font-medium ">{datePeriodStart.toLocaleDateString()}</span>
                                    </p>
                                    <p className="flex flex-col gap-1 items-start font-secondary mb-4">
                                        <label className="text-[0.875rem] font-semibold ">Status</label>
                                        <span className="text-[1rem] font-medium ">{user_subscription.status.charAt(0).toUpperCase() + user_subscription.status.slice(1)}</span>
                                    </p>
                                    
                                </article>
                                <article className="">
                                    <p className="flex flex-col gap-1 items-start font-secondary mb-4">
                                        <label className="text-[0.875rem] font-semibold ">Price</label>
                                        <span className="text-[1rem] font-medium ">{user_subscription.plan.price} SEK</span>
                                    </p>
                                    
                                    <p className="flex flex-col gap-1 items-start font-secondary mb-4">
                                        <label className="text-[0.875rem] font-semibold ">Subscription Ends</label>
                                        <span className="text-[1rem] font-medium ">{datePeriodEnd.toLocaleDateString()}</span>
                                    </p>
                                    <p className="flex flex-col gap-1 items-start font-secondary mb-4">
                                        <label className="text-[0.875rem] font-semibold ">Cancel At Period End</label>
                                        <span className="text-[1rem] font-medium ">{user_subscription.cancel_at_period_end.toString()}</span>
                                    </p>
                                </article>

                            </section>
                            <Button className="place-self-end mt-2" onClick={() => {handleCancelSubscription()}} text="Cancel" />
                        </article>
                    )}
                </div>
            </Activity>
        </>
    )
}