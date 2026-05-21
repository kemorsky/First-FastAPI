import { cn } from "../../../lib/utils";

interface CardProps {
    title: string;
    description: string;
    className?: string;
}

export const FeaturesCard = (props: CardProps) => {
    return (
        <div className={cn("bg-card p-4 max-h-68 h-full gap-3 w-full flex flex-col items-start justify-start border border-transparent", props.className)}>
            <section className="flex gap-4 items-center font-primary text-text">
                <h2 className="font-semibold text-xl">{props.title}</h2>
                <p className="text-text">icon</p>
            </section>
            <section className="text-left">
                <article className="mt-3 w-full max-w-100">
                    <p className="font-secondary text-text-muted">{props.description}</p>
                </article>
            </section>
        </div>
    )
}