import { useState } from "react";
import type { Step } from "../../../types/types";
import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { HowToUseStepDisplay } from "./how-to-use-step-display";
import { HowToUseStepCard } from "../../components/cards/how-to-use-step-card";

const stepData: Step[] = [
    {
        id: 1,
        image: "../../../assets/images/step-image.png",
        title: "Ask",
        description: "State your question to the software and await its compiled answer",
        details: "Input your question into the rield and press the button."
    },
    {
        id: 2,
        image: "../../../assets/images/step-image.png",
        title: "Read",
        description: "Examine the output and control the content. When in doubt, ask again",
        details: "The software will search through its database compiled by you and you alone and use its algorithm to find the answer and compile it into a comprehensible, easy to follow answer."
    },
    {
        id: 3,
        image: "../../../assets/images/step-image.png",
        title: "Apply",
        description: "Test the output and apply if to your issues",
        details: "Use your refreshed knowledge and apply it wherever necessary. The more detailed the fed documentation and question, the better the answer. If in doubt, ask again."
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
                            <div key={step.id} className="flex flex-col">
                                <span className={`${step === activeStep ? "h-px bg-border animate-topBorder" : "h-px"}`}/>
                                <HowToUseStepCard 
                                    className={`${step === activeStep ? "" : ""}`}
                                    onClick={() => {handleClick(step)}}  
                                    id={step.id} 
                                    image={step.image}
                                    title={step.title} 
                                    description={step.description} 
                                    details={step.details}
                                />
                            </div>
                        ))}
                        </section>
                </div>
            </Container>
        </Wrapper>
    )
}