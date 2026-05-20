import type { Step } from "../../../types/types";

export const HowToUseStepCard = (props: Step) => {
    console.log("testing re-renders")
    return (
        <section 
            onClick={props.onClick} 
            className="w-70 h-40 flex flex-col items-center justify-center gap-4 p-4 rounded-xl border border-border"
        >
            <article className="w-full text-left">
                <p className="mb-4 font-secondary text-[1.125rem] font-semibold">{props.title}</p>
                <p className="font-secondary text-[0.875rem] text-text-muted ">{props.description}</p>
            </article>
        </section>
    )
};