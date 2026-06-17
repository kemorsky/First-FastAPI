import type { Step } from "../../../types/types";
import { cn } from "../../../lib/utils";

type CardProps = Step & {
    className?: string;
}

export default function HowToUseStepCard(props: CardProps) {
    
    return (
        <section 
            tabIndex={0}
            onClick={props.onClick} 
            className={cn("w-full max-w-43 sm:max-w-65 h-full max-h-40 p-4 border border-transparent rounded-b-lg transition-colors cursor-pointer", props.className)}
        >
            <article className="w-full text-left">
                <p className="mb-4 font-secondary text-text text-[1.125rem] font-semibold">{props.title}</p>
                <p className="font-secondary text-[0.875rem] text-text-muted ">{props.description}</p>
            </article>
        </section>
    )
};