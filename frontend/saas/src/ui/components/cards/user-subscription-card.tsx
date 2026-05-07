import { Activity } from "react";
import HorizontalRule from "../../shared/horizontal-rule";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userSubscriptionQueryOptions } from "../../../queries/userQueryOptions";
import { Button } from "../../shared/buttons";
import usePayment from "../../../hooks/usePayment";

export const UserSubscriptionCard = () => {
    const { handleCancelSubscription } = usePayment();
    
    const { data: user_subscription  } = useSuspenseQuery({
        ...userSubscriptionQueryOptions(),
    });

    const datePeriodStart = new Date(user_subscription.current_period_start);
    const datePeriodEnd = new Date(user_subscription.current_period_end);

    return (
        <>
            <Activity mode={!user_subscription ? "visible" : "hidden"}>
                <div className="bg-gray-600 w-full max-w-120 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
                    <section className="flex justify-center items-start gap-3">
                        <p className="text-[1.125rem] font-semibold">No subscription available.</p>
                    </section>
                </div>
            </Activity>
            
            <Activity mode={user_subscription ? "visible" : "hidden"}>
                <div className="bg-gray-600 w-full max-w-120 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
                    <section className="flex justify-center items-start gap-3">
                        <p className="text-[1.125rem] font-semibold">Current Subscription</p>
                    </section>
                    <HorizontalRule />
                    <article className="text-left">
                        <p className="mb-2">Plan: {user_subscription.plan.name}</p>
                        <p className="mb-2">Price: {user_subscription.plan.price} SEK</p>
                        <p className="mb-2">Status: {user_subscription.status.charAt(0).toUpperCase() + user_subscription.status.slice(1)}</p>
                        <p className="mb-2">Subscription Created: {datePeriodStart.toLocaleDateString()}</p>
                        <p className="mb-2">Subscription Ends: {datePeriodEnd.toLocaleDateString()}</p>
                        <p className="mb-2">Cancel At Period End: {user_subscription.cancel_at_period_end.toString()}</p>
                    </article>
                    <HorizontalRule />
                    <Button className="self-end" onClick={() => {handleCancelSubscription()}} text="Cancel" />
                </div>
            </Activity>
        </>
    )
}