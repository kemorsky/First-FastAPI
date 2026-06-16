import { useState } from "react";
import type { Step } from "../../../types/types";
import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { HowToUseStepDisplay } from "./how-to-use-step-display";
import { HowToUseStepCard } from "../../components/cards/how-to-use-step-card";

const stepData: Step[] = [
    {
        id: 1,
        image: "../../../../src/assets/images/step-image-1.png",
        title: "Feed",
        description: "Import your data to the platform",
        details: "Compile your documents, data, or GitHub repository and upload them to the platform. Once completed the platform will be ready to use."
    },
    {
        id: 2,
        image: "../../../../src/assets/images/step-image-2.png",
        title: "Ask",
        description: "State your question to the software and await its compiled answer",
        details: "Input your question into the field and press the button."
    },
    {
        id: 3,
        image: "../../../../src/assets/images/step-image-3.png",
        title: "Read",
        description: "Examine the output and control the content. When in doubt, ask again",
        details: "The software will search through its database using it's AI-powered algorithm to find and compile relevant data into a comprehensible, easy to follow answer. For maximum accuracy you can toggle direct links to sources in the settings.\n"
    },
    {
        id: 4,
        image: "../../../../../src/assets/images/step-image-4.png",
        title: "Apply",
        description: "Test the output and apply if to your issues",
        details: "Use your refreshed knowledge and apply it wherever necessary. The more detailed the fed documentation and question, the better the answer. If in doubt, ask again."
    },
]

export const HowToUse = () => {
    const [ activeStep, setActiveStep ] = useState<Step>(stepData[0]);

    const handleClick = (step: Step) => {
        setActiveStep(step);
    }

    console.log(activeStep);

    return (
        <Wrapper className="bg-bg" id="how-to-use">
            <Container>
                <article className="mb-15">
                    <h1 className="text-4xl font-bold font-primary mb-2 text-text">How To Use</h1>
                    <h2 className="font-secondary text-text-muted">Our trusted process will handle the searching for you</h2>
                </article>
                <Container className="py-0 border-none">
                    <div className="flex flex-col gap-8 items-center justify-between p-4 sm:p-6">
                        <section className="w-full flex justify-center flex-row flex-wrap sm:gap-4">
                            {stepData.map((step) => (
                                <div key={step.id} className="flex flex-col">
                                    <span className={`${step.id === activeStep.id ? "h-px bg-linear-to-r from-sky-500 to-red-300 animate-topBorder" : "h-px"}`}/>
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
                        {activeStep && (
                            <HowToUseStepDisplay step={activeStep} />  
                        )}
                    </div>
                </Container>
            </Container>
        </Wrapper>
    )
}