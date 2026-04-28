interface CollapsibleProps {
    question: string;
    answer: string;
}

export const Collapsible = (props: CollapsibleProps) => {
    return (
        <details className="bg-gray-300 w-full max-w-217 max-h-36 p-4 rounded-md select-none text-left transition-[height] duration-300 ease-out">
            <summary className="cursor-pointer flex items-start justify-between h-8 transition-[height] duration-300 ease-out">
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