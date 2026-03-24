import { type Plan } from "../../../types/types"

interface CardProps extends Plan {
    children: React.ReactNode;
}

export const PlanCard = (props: CardProps) => {
    return (
        <div className="bg-gray-600 max-w-95 p-4 gap-4 rounded-2xl w-full flex flex-col items-start justify-start">
            <h1>{props.name}</h1>
            <section className="flex flex-col gap-10">
                <h2>{props.stripe_product_name}</h2>
                <h1>{props.price}</h1>
            </section>
            <ul className="text-left">
                <li>{props.description}</li>
            </ul>
            {props.children}
        </div>
    )
}