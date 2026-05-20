import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { FeaturesCard } from "../../components/cards/features-card"

export const Features = () => {
    return (
        <Wrapper id="features" className="bg-dark">
            <Container className="flex flex-col items-center justify-center border border-border">
                {/* <h1 className="font-primary">Features</h1> */}
                <section className="w-full sm:flex-row sm:flex flex-col items-center justify-center border-b border-border">
                    <FeaturesCard className="sm:w-[60%] w-full sm:border-r border-b border-border"
                                title="Test" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                    <FeaturesCard className="sm:w-[40%] w-full"
                                title="Test2" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                </section>
                <section className="w-full sm:flex-row sm:flex flex-col items-center justify-center">
                    <FeaturesCard className="sm:w-[40%] w-full sm:border-r border-b border-border"
                                title="Test3" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                    <FeaturesCard className="sm:w-[60%] w-full"
                                title="Test4" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Labore nam, voluptate perspiciatis eius impedit quasi, quas quaerat maiores consequatur, commodi sit deserunt!"/>
                </section>
            </Container>
        </Wrapper>
    )
}