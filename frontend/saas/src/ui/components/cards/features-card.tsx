interface CardProps {
    title: string;
    description: string;
}

export const FeaturesCard = (props: CardProps) => {
    return (
        <div className="bg-gray-600 max-w-95 p-4 gap-4 rounded-2xl w-full flex flex-col items-start justify-start">
            <section>
                <p>icon</p>
            </section>
            <section className="text-left">
                <article>
                    <h2>{props.title}</h2>
                </article>
                <article className="mt-3">
                    <p>{props.description}</p>
                </article>
            </section>
        </div>
    )
}