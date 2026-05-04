import { type UserSubscription, type Plan } from "../../../types/types"
import HorizontalRule from "../../shared/horizontal-rule";

type Subscription = UserSubscription & Plan

interface CardProps extends Subscription {
    children: React.ReactNode;
}

export const UserSubscriptionCard = (props: CardProps) => {
    const datePeriodStart = new Date(props.current_period_start);
    const datePeriodEnd = new Date(props.current_period_end);

    return (
        <div className="bg-gray-600 w-full max-w-120 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
            <section className="flex justify-center items-start gap-3">
                <p className="text-[1.125rem] font-semibold">Current Subscription</p>
            </section>
            <HorizontalRule />
            <article className="text-left">
                <p className="mb-2">Plan: {props.plan.name}</p>
                <p className="mb-2">Price: {props.price} SEK</p>
                <p className="mb-2">Status: {props.status.charAt(0).toUpperCase() + props.status.slice(1)}</p>
                <p className="mb-2">Subscription Created: {datePeriodStart.toLocaleDateString()}</p>
                <p className="mb-2">Subscription Ends: {datePeriodEnd.toLocaleDateString()}</p>
                <p className="mb-2">Cancel At Period End: {props.cancel_at_period_end.toString()}</p>
            </article>
            <HorizontalRule />
            {props.children}
        </div>
    )
}