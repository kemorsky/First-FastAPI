import { type Plan } from "../../../types/types"
import HorizontalRule from "../../shared/horizontal-rule";

interface CardProps extends Plan {
    children: React.ReactNode;
}

export const PlanCard = (props: CardProps) => {
    console.log(props)

    return (
        <div className="bg-gray-600 max-w-95 flex flex-col rounded-2xl">
            <section className="w-full">
                <h1 className="p-4 text-3xl font-secondary font-bold">{props.name}</h1>
            </section>
            <HorizontalRule />
            <section className="w-full flex flex-col items-center justify-center">
                <article className="p-4 ">
                    <h1 className="text-left text-5xl font-secondary font-bold">{props.price} SEK</h1>
                    <p className="text-gray-400">(Billed at the end of period)</p>
                </article>
                {props.children}
            </section>
            <section className=" w-full flex flex-col items-start justify-start px-4 pb-4 gap-6">
                <p className="text-left">{props.description}</p>
            </section>
            <HorizontalRule />
            <section className=" w-full flex flex-col items-center justify-center p-4 gap-6">
                <ul className="text-left self-start">
                    {props.stripe_marketing_features.map((feature) => {
                        return (
                            <li className="font-secondary font-semibold mb-2" key={feature}>
                                <span className="mr-2">✓</span>
                                {feature}
                            </li>
                        )
                    })}
                </ul>
                
            </section>
        </div>
    )
}