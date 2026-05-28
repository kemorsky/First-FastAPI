import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { TestimonialCard } from "../../components/cards/testimonial"

export const Testimonials = () => {
    const testimonialsFirstColumn = [
        {
            id: 1,
            icon: "icon",
            testimony: "AutoDoccie has allowed us to cut costs and save time. The ability to ask question to something containing only our own data has eliminated the risk of putting inaccurate or hallucinated code into our products.",
            name: "John Skyrim",
            title: "Fullstack Engineer"
        },
        {
            id: 2,
            icon: "icon",
            testimony: "Having full control over what content is being fed to the software has been a gamechanger. The lack of unnecessary fillers inside the database allows us to query our data and our data alone.",
            name: "Ahmad Al-Safe",
            title: "Founder"
        },
    ];

    const testimonialsSecondColumn = [
        {
            id: 1,
            icon: "icon",
            testimony: "testy test of testimony testy test of testimony testy test of testimony testy test of testimony ",
            name: "Test Tester",
            title: "Test Title"
        },
        {
            id: 2,
            icon: "icon",
            testimony: "Having full control over what content is being fed to the software has been a gamechanger. The lack of unnecessary fillers inside the database allows us to query our data and our data alone.",
            name: "Ahmad Al-Safe",
            title: "Founder"
        },
    ];

    return (
        <Wrapper className="bg-card" id="testimonials">
            <section>
                <h1 className="text-4xl font-bold font-primary mb-2">Approved by customers</h1>
                <h2 className="font-secondary mb-6">See for yourself</h2>
                <button className="bg-green-300">Testimonials</button>
            </section>
            <Container className="max-h-150 carousel overflow-hidden py-4 mt-6 flex flex-col gap-6">
                <div className="flex">
                    <div className="animate-carousel flex shrink-0 items-start justify-center gap-4 pr-4">
                        {testimonialsFirstColumn.map((card) => {
                            return (
                                <TestimonialCard 
                                    key={card.id}
                                    icon={card.icon}
                                    testimony={card.testimony}
                                    name={card.name}
                                    title={card.title}
                                />
                            )
                        })}
                        
                    </div>
                    <div aria-hidden className="animate-carousel flex shrink-0 items-start justify-center gap-4 pr-4">
                        {testimonialsSecondColumn.map((card) => {
                            return (
                                <TestimonialCard 
                                    key={card.id}
                                    icon={card.icon}
                                    testimony={card.testimony}
                                    name={card.name}
                                    title={card.title}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div className="animate-carousel2 flex shrink-0 items-start justify-center gap-4 pr-4">
                        {testimonialsFirstColumn.map((card) => {
                            return (
                                <TestimonialCard 
                                    key={card.id}
                                    icon={card.icon}
                                    testimony={card.testimony}
                                    name={card.name}
                                    title={card.title}
                                />
                            )
                        })}
                        
                    </div>
                    <div aria-hidden className="animate-carousel2 flex shrink-0 items-start justify-center gap-4 pr-4">
                        {testimonialsSecondColumn.map((card) => {
                            return (
                                <TestimonialCard 
                                    key={card.id}
                                    icon={card.icon}
                                    testimony={card.testimony}
                                    name={card.name}
                                    title={card.title}
                                />
                            )
                        })}
                    </div>
                </div>
            </Container>
        </Wrapper>
        
    )
}