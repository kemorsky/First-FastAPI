interface CardProps {
    testimony: string;
    name: string;
    title: string;
}

export const TestimonialCard = (props: CardProps) => {
    return (
        <div className="bg-white max-w-95 min-h-84 p-4 gap-4 rounded-2xl w-full flex flex-col items-start justify-between">
            <section className="flex flex-col gap-6 text-black">
                <p className="text-left">icon</p>
                <article className="text-left">
                    <p className="italic">{props.testimony}</p>
                </article>
            </section>
            <article className="mt-3 text-left text-black">
                <p className="font-bold">{props.name}</p>
                <p className="font-medium">{props.title}</p>
            </article>
        </div>
    )
}