import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { Button } from "../../shared/buttons"

export const Hero = () => {
    return (
        <Wrapper className="light:bg-red-800 bg-bg">
            <Container className="min-h-132 h-full flex flex-col justify-between items-center">
                <article className="max-w-100 max-h-132 h-full text-left flex flex-col items-center justify-center gap-4">
                    <h2 className="text-[3rem] text-center font-semibold font-primary text-text leading-14">Navigate Your Documentation The Right Way</h2>
                    <p className="font-secondary text-text-muted">Your answer is there. You just need to ask.</p>
                    <div className="flex items-center justify-center gap-3">
                        <Button text="Sign Up" variant="secondary" />
                        <Button text="Learn More" variant="learn-more" />
                    </div>
                </article>
                <article className="max-w-160 w-full max-h-132 h-full bg-gray-200 ">
                    {/* <img src="" alt="" /> */}
                    <h1>hero picture goes here</h1>
                </article>
            </Container>
        </Wrapper>
    )
}