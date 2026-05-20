import type { Step } from "../../../types/types";

export const HowToUseStepCard = (props: Step) => {
    console.log("testing re-renders")
    return (
        <article key={props.id} onClick={props.onClick} className="w-40 h-40 rounded-xl border border-border">
            <p>{props.title}</p>
            <p>{props.description}</p>
        </article>
    )
};