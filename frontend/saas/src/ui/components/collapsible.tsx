import { FAQIcon } from "../../assets/icons/faq-svgrepo";
import { FAQArrowDown } from "../../assets/icons/faq-arrow-down";

interface CollapsibleProps {
    question: string;
    answer: string;
}

export const Collapsible = (props: CollapsibleProps) => {
    return (
        <details className="animate-details group bg-bg w-full max-w-217 max-h-50 p-4 rounded-sm border border-border select-none text-left overflow-hidden">
            <summary className="cursor-pointer flex items-center justify-between min-h-8 py-3">
                <section className="flex self-center gap-4">
                    <FAQIcon />
                    <p className="font-secondary text-text text-[1.125em]">{props.question}</p>
                </section>
                <p className="bg-card rounded-sm p-2  ">
                    <FAQArrowDown />
                </p>
            </summary>
            <div className="details-content overflow-hidden my-4 border-t border-border">
                <p className="mt-6 font-secondary text-text-muted">{props.answer}</p>
            </div>
        </details>
    )
}