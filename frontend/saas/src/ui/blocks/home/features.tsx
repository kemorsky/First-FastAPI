import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { FeaturesCard } from "../../components/cards/features-card"

export const Features = () => {
    return (
        <Wrapper>
            <Container className="flex flex-col items-center justify-center gap-8">
                <h1>Features</h1>
                <section className="flex items-center justify-center gap-8">
                    <FeaturesCard title="Test" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                    <FeaturesCard title="Test2" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                </section>
                <section className="flex items-center justify-center gap-8">
                    <FeaturesCard title="Test3" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                    <FeaturesCard title="Test4" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                </section>
            </Container>
        </Wrapper>
    )
}