import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { TestimonialCard } from "../../components/cards/testimonial"

export const Testimonials = () => {
    return (
        <Wrapper className="bg-card">
            <section>
                <h1 className="text-3xl font-bold font-primary mb-4">Approved by customers</h1>
                <h2 className="font-secondary mb-6">See for yourself</h2>
                <button className="bg-green-300">Testimonials</button>
            </section>
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