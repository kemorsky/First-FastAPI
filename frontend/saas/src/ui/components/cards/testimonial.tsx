interface CardProps {
    testimony: string;
    name: string;
    title: string;
}

export const TestimonialCard = (props: CardProps) => {
    return (
        <div className="bg-bg font-secondary max-w-95 min-h-84 border border-border p-4 gap-4 rounded-2xl w-full flex flex-col items-start justify-between">
            <section className="flex flex-col gap-6 text-text">
                <p className="text-left">icon</p>
                <article className="text-left">
                    <p className="italic text-muted">{props.testimony}</p>
                </article>
            </section>
            <article className="mt-3 text-left">
                <p className="font-bold text-text">{props.name}</p>
                <p className="font-medium text-text-muted">{props.title}</p>
            </article>
        </div>
    )
}