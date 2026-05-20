import { useState } from "react";
import type { Step } from "../../../types/types";
import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { HowToUseStepDisplay } from "./how-to-use-step-display";
import { HowToUseStepCard } from "../../components/cards/how-to-use-step-card";

const stepData: Step[] = [
    {
        id: 1,
        title: "Test 1",
        description: "This is test 1",
    },
    {
        id: 2,
        title: "Test 2",
        description: "This is test 2",
    },
    {
        id: 3,
        title: "Test 3",
        description: "This is test 3",
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
            <Container>
                <h1>How To Use</h1>
                <div className="flex flex-col sm:flex-row gap-12 items-center justify-between sm:mt-10 mt-6">
                    <div className="border border-border rounded-xl min-w-120 h-80 w-full">
                        {/* <img src="" alt="" /> */}
                    </div>
                    <article className="min-w-120 w-full p-3">
                        <p className="text-left text-[1.125rem] text-text">From setup to usage stage, the software is very easy and intuitive to use:</p>
                        <ul className="list-dist text-left mt-3">
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                        </ul>
                    </article>
                </div>

                <div className="flex flex-col gap-8 items-center justify-between sm:mt-10 mt-6">
                    <h2>New steps test</h2>
                    {activeStep && (
                        <HowToUseStepDisplay step={activeStep} />  
                    )}
                    <section className="flex sm:flex-row flex-col gap-4">
                        {stepData.map((step) => (
                            <HowToUseStepCard 
                                onClick={() => {handleClick(step)}} 
                                key={step.id} id={step.id} 
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