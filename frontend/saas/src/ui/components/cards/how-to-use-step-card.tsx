import type { Step } from "../../../types/types";
import { cn } from "../../../lib/utils";

type CardProps = Step & {
    className?: string;
}

export const HowToUseStepCard = (props: CardProps) => {
    
    return (
        <section 
            tabIndex={0}
            onClick={props.onClick} 
            className={cn("w-full max-w-43 sm:max-w-65 h-full max-h-40 flex flex-col items-center justify-start gap-4 p-4 border-t border-transparent transition-colors cursor-pointer", props.className)}
        >
            <article className="w-full text-left">
                <p className="mb-4 font-secondary text-[1.125rem] font-semibold">{props.title}</p>
                <p className="font-secondary text-[0.875rem] text-text-muted ">{props.description}</p>
            </article>
        </section>
    )
};