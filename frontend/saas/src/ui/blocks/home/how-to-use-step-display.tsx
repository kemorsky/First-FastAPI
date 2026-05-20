import type { Step } from "../../../types/types";

type StepProps = {
    step: Step;
}

export const HowToUseStepDisplay = (props: StepProps) => {
    return (
        <section className="w-full max-w-180 h-full min-h-60 rounded-xl border border-border">
            <p>{props.step.title}</p>
            <p>{props.step.description}</p>
        </section>
    );
};