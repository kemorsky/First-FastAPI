import { type UserSubscription, type Plan } from "../../../types/types"

type Subscription = UserSubscription & Plan

interface CardProps extends Subscription {
    children: React.ReactNode;
}

export const UserSubscriptionCard = (props: CardProps) => {
    return (
        <div className="bg-gray-600 max-w-95 p-4 gap-4 rounded-2xl w-full flex flex-col items-start justify-start">
            <ul className="flex flex-col text-left">
                <li>Price: {props.price}</li>
                <li>Status: {props.status}</li>
                <li>Subscription Created: {props.current_period_start}</li>
                <li>Subscription Ends: {props.current_period_end}</li>
            </ul>
            {props.children}
        </div>
    )
}