import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { FeaturesCard } from "../../components/cards/features-card"

export const Features = () => {
    return (
        <Wrapper id="features" className="bg-dark">
            <Container className="flex flex-col gap-[1px] items-center justify-center bg-border border border-transparent">
                <section className="w-full sm:flex-row sm:flex flex-col gap-[1px] items-center justify-center">
                    <FeaturesCard className="sm:basis-[60%] w-full"
                                title="Test" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
                    <FeaturesCard className="sm:basis-[40%] w-full"
                                title="Test2" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
                </section>
                <section className="w-full sm:flex-row sm:flex flex-col gap-[1px] items-center justify-center">
                    <FeaturesCard className="sm:basis-[40%] w-full"
                                title="Test3" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
                    <FeaturesCard className="sm:basis-[60%] w-full"
                                title="Test4" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
                </section>
            </Container>
        </Wrapper>
    )
}