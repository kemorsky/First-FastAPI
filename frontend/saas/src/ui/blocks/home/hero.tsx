import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { Button } from "../../shared/buttons"

export const Hero = () => {
    return (
        <Wrapper className="bg-gray-500">
            <Container className="min-h-132 h-full flex justify-between items-center">
                <article className="max-w-100 max-h-132 h-full flex flex-col items-center justify-center gap-4">
                    <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>
                    <p>Deserunt natus non recusandae? Perspiciatis, ea pariatur labore natus autem tempora earum quo deserunt at et laboriosam sequi? Architecto magnam porro reprehenderit!</p>
                    <div className="flex gap-3">
                        <Button text="Learn More" variant="learn-more" />
                        <Button text="Sign In" variant="primary" />
                    </div>
                </article>
                <article className="max-w-160 w-full max-h-132 h-full bg-gray-200 ">
                    <img src="" alt="" />
                    <h1>hero picture goes here</h1>
                </article>
            </Container>
        </Wrapper>
    )
}