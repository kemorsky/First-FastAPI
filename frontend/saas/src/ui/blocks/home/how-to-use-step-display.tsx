import type { Step } from "../../../types/types";

type StepProps = {
    step: Step;
}

export const HowToUseStepDisplay = (props: StepProps) => {
    return (
        <section className="w-full h-full min-h-60 flex justify-between p-4 rounded-xl">
            <article className="w-90 p-4 text-left">
                <p>{props.step.details}</p>
            </article>
            <img className="max-w-180" src={props.step.image} alt="step image"/>
        </section>
    );
};