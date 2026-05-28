interface CardProps {
    icon: string;
    testimony: string;
    name: string;
    title: string;
}

export const TestimonialCard = (props: CardProps) => {
    return (
        <div className="testimonial-card bg-bg max-w-95 w-full font-secondary border border-border p-4 gap-4 rounded-2xl flex flex-col items-start justify-between">
            <section className="flex flex-col gap-6 text-text">
                <p className="text-left">{props.icon}</p>
                <article className="text-left">
                    <p className="text-text-muted italic">"{props.testimony}"</p>
                </article>
            </section>
            <article className="mt-3 text-left">
                <p className="font-bold text-text">{props.name}</p>
                <p className="font-medium text-text-muted">{props.title}</p>
            </article>
        </div>
    )
}