interface CollapsibleProps {
    question: string;
    answer: string;
}

export const Collapsible = (props: CollapsibleProps) => {
    return (
        <details className="bg-gray-300 w-full max-w-217 p-4 rounded-md select-none text-left">
            <summary className="cursor-pointer flex items-start justify-between h-8">
                <section className="flex self-star gap-4">
                    <p>icon</p>
                    {props.question}
                </section>
                <p>icon</p>
            </summary>
            <p className="mt-4">{props.answer}</p>
        </details>
    )
}