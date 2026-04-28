import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { TestimonialCard } from "../../components/cards/testimonial"

export const Testimonials = () => {
    return (
        <Wrapper className="bg-card">
            <h1>Testimonials</h1>
            <Container className="flex items-center justify-start gap-5 p-5">
                <TestimonialCard // TODO - consider a carousel
                    testimony="testy test of testimony testy test of testimony testy test of testimony testy test of testimony " 
                    name="Test Tester" 
                    title="Test Title"
                />
                <TestimonialCard 
                    testimony="testy test of testimony testy test of testimony testy test of testimony testy test of testimony " 
                    name="Test Tester" 
                    title="Test Title"
                />
                <TestimonialCard 
                    testimony="testy test of testimony testy test of testimony testy test of testimony testy test of testimony " 
                    name="Test Tester" 
                    title="Test Title"
                />
            </Container>
        </Wrapper>
        
    )
}