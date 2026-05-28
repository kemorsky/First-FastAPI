import { useState } from "react";
import type { Step } from "../../../types/types";
import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { HowToUseStepDisplay } from "./how-to-use-step-display";
import { HowToUseStepCard } from "../../components/cards/how-to-use-step-card";

const stepData: Step[] = [
    {
        id: 1,
        image: "../../../../src/assets/images/step-image.png",
        title: "Feed",
        description: "Import your documentation and data into the platform",
        details: "Compile your documents and data and upload them to the platform. Once completed the platform will be ready to use."
    },
    {
        id: 2,
        image: "../../../../src/assets/images/step-image.png",
        title: "Ask",
        description: "State your question to the software and await its compiled answer",
        details: "Input your question into the rield and press the button."
    },
    {
        id: 3,
        image: "../../../../src/assets/images/step-image.png",
        title: "Read",
        description: "Examine the output and control the content. When in doubt, ask again",
        details: "The software will search through its database compiled by you and you alone and use its algorithm to find the answer and compile it into a comprehensible, easy to follow answer."
    },
    {
        id: 4,
        image: "../../../../../src/assets/images/step-image.png",
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
        <Wrapper className="bg-bg" id="how-to-use">
            <article className="mb-15">
                <h1 className="text-4xl font-bold font-primary mb-2">How To Use</h1>
                <h2 className="font-secondary text-text-muted">Our trusted process will handle the searching for you</h2>
            </article>
            <Container className="">
                <div className="flex flex-col gap-8 items-center justify-between p-6">
                    {activeStep && (
                        <HowToUseStepDisplay step={activeStep} />  
                    )}
                    <section className="w-full flex justify-between sm:flex-row flex-col">
                        {stepData.map((step) => (
                            <div key={step.id} className="flex flex-col">
                                <span className={`${step === activeStep ? "h-px bg-linear-to-r from-sky-500 to-red-300 animate-topBorder" : "h-px"}`}/>
                                <HowToUseStepCard 
                                    className={`${step === activeStep ? "bg-card border-b rounded-b-lg opacity-100" : "opacity-75"}`}
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