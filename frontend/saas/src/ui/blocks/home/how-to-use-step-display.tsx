import type { Step } from "../../../types/types";

type StepProps = {
    step: Step;
}

export const HowToUseStepDisplay = (props: StepProps) => {
    return (
        <section key={props.step.id} className="w-full h-full min-h-60 flex sm:flex-row gap-4 sm:gap-0 flex-col justify-between p-4 rounded-xl">
            <article className="sm:p-4 text-left font-secondary text-text">
                <p className="animate-howToUseDisplayTextFadeDown">{props.step.details}</p>
            </article>
            <img className="max-w-180 animate-howToUseDisplayFadeIn" src={props.step.image} alt="step image"/>
        </section>
    );
};