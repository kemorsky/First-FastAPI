import { useState } from "react";
import type { Step } from "../../../types/types";
import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { HowToUseStepDisplay } from "./how-to-use-step-display";
import { HowToUseStepCard } from "../../components/cards/how-to-use-step-card";

const stepData: Step[] = [
    {
        id: 1,
        title: "Ask",
        description: "State your question to the software and await its compiled answer",
    },
    {
        id: 2,
        title: "Read",
        description: "Examine the output and control the content. When in doubt, ask again",
    },
    {
        id: 3,
        title: "Apply",
        description: "Test the output and apply if to your issues",
    },
]

export const HowToUse = () => {
    const [ activeStep, setActiveStep ] = useState<Step | null>(null);

    if (!activeStep) {
        setActiveStep(stepData[0]);
    }

    const handleClick = (step: Step) => {
        setActiveStep(step);
        console.log(activeStep);
    }

    return (
        <Wrapper className="bg-bg">
            <Container className="bg-card">
                <h1>How To Use</h1>

                <div className="flex flex-col gap-8 items-center justify-between p-6">
                    {activeStep && (
                        <HowToUseStepDisplay step={activeStep} />  
                    )}
                    <section className="w-full flex justify-center sm:flex-row flex-col gap-12">
                        {stepData.map((step) => (
                            <HowToUseStepCard 
                                className={`${step === activeStep ? "border-t border-border " : ""}`}
                                onClick={() => {handleClick(step)}} 
                                key={step.id} 
                                id={step.id} 
                                title={step.title} 
                                description={step.description} 
                            />
                        ))}
                        </section>
                </div>
            </Container>
        </Wrapper>
    )
}