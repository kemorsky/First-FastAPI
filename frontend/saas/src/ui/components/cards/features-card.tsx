interface CardProps {
    title: string;
    description: string;
}

export const FeaturesCard = (props: CardProps) => {
    return (
        <div className="bg-white max-w-95 p-4 gap-4 rounded-2xl border border-black w-full flex flex-col items-start justify-start">
            <section>
                <p className="text-black">icon</p>
            </section>
            <section className="text-left">
                <article className="font-play text-black">
                    <h2 className="font-semibold text-xl">{props.title}</h2>
                </article>
                <article className="mt-3">
                    <p className="font-play text-black/65">{props.description}</p>
                </article>
            </section>
        </div>
    )
}