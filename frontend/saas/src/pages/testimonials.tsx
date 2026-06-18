import Wrapper from "../ui/shared/wrapper"
import Container from "../ui/shared/container"
import { Navbar } from "../ui/blocks/shared/navbar"
import { Footer } from "../ui/blocks/shared/footer"

export default function TestimonialsPage() {
    return (
        <main className="w-full bg-bg min-h-screen h-full flex flex-col justify-start items-center">
            <Navbar />
            <Wrapper>
                <Container>
                    <h1>Testimonials</h1>
                </Container>
            </Wrapper>
            <Footer />
        </main>
    )
}