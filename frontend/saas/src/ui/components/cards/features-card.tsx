import { cn } from "../../../lib/utils";

interface CardProps {
    title: string;
    description: string;
    className?: string;
}

export const FeaturesCard = (props: CardProps) => {
    return (
        <div className={cn("animate-test bg-card p-4 max-h-60 sm:max-h-48 h-full gap-3 w-full basis-[50%] flex flex-col items-start justify-start", props.className)}>
            <section className="flex flex-col gap-4 items-start justify-start font-secondary text-text">
                <p className="text-text">icon</p>
                <h2 className="font-semibold text-[1.25rem] ">{props.title}</h2>
            </section>
            <section className="text-left">
                <article className="mt-1 ">
                    <p className="font-secondary text-text-muted">{props.description}</p>
                </article>
            </section>
        </div>
    )
}