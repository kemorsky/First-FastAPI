import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { FeaturesCard } from "../../components/cards/features-card"

export const Features = () => {
    return (
        <Wrapper id="features" className="bg-dark">
            <article className="mb-15">
                <h1 className="text-4xl font-bold font-primary mb-2 text-text">Features</h1>
                <h2 className="font-secondary text-text-muted">Designed with your comfort and time management in mind </h2>
            </article>
            <Container className="flex flex-col gap-[1px] items-center justify-center bg-border border border-transparent">
                <section className="w-full sm:flex-row flex flex-col gap-[1px] items-center justify-center">
                    <FeaturesCard 
                                title="Data Management" 
                                description="Compile your data and documentation in one place within the platform. Update it whenever you want, refresh, and keep working. Keep everything under the same hood and it will never get lost. "/>
                    <FeaturesCard 
                                title="Correct, Adjust, Apply" 
                                description="Cycle through content that you and you alone control thanks to the new generation powered search engine. In the event of doubt, ask for a correction, or request the source to control it yourself."/>
                </section>
                <section className="w-full sm:flex-row flex flex-col gap-[1px] items-center justify-center">
                    <FeaturesCard 
                                title="Pinpoint Accuracy" 
                                description="Use the compiled search results to blow the dust off the legacy parts of your documentation. Search results will adjust to your prompt and the content. "/>
                    <FeaturesCard 
                                title="Output Control" 
                                description="Calibrate the output whenever you want. Theme, font, text pattern and detail - settings are easily adjustable, user-friendly, and responsive to your needs."/>
                </section>
            </Container>
        </Wrapper>
    )
}