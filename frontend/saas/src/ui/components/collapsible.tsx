interface CollapsibleProps {
    question: string;
    answer: string;
}

export const Collapsible = (props: CollapsibleProps) => {
    return (
        <details className="group bg-gray-300 w-full max-w-217 max-h-36 p-4 rounded-md select-none text-left">
            <summary className="cursor-pointer flex items-start justify-between h-8">
                <section className="flex self-start gap-4">
                    <p>icon</p>
                    <p>{props.question}</p>
                </section>
                <p className="transition-transform duration-300 group-open:rotate-180">icon</p>
            </summary>
            <div className="overflow-hidden">
                <p className="mt-4">{props.answer}</p>
            </div>
        </details>
    )
}