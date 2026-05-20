import type { Step } from "../../../types/types";

type StepProps = {
    step: Step;
}

export const HowToUseStepDisplay = (props: StepProps) => {
    return (
        <section className="w-40 h-40 rounded-xl border border-border">
            <p>{props.step.title}</p>
            <p>{props.step.description}</p>
        </section>
    );
};