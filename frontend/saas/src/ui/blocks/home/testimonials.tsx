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
            <Container className="overflow-hidden py-4 mt-6">
                <div className="carousel flex">
                    <div className="animate-carousel flex shrink-0 items-center justify-center gap-4 pr-4">
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
                    </div>
                    <div aria-hidden className="animate-carousel flex shrink-0 items-center justify-center gap-4 pr-4">
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
                    </div>
                </div>
            </Container>
        </Wrapper>
        
    )
}