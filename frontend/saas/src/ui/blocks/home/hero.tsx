import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { Button } from "../../shared/buttons"

export const Hero = () => {
    return (
        <Wrapper className="light:bg-red-800 bg-bg">
            <Container className="min-h-132 h-full flex flex-col gap-10 justify-between items-center">
                <article className="max-w-100 max-h-132 h-full text-left">
                    <h2 className="text-[3rem] text-center font-semibold font-primary text-text leading-14">Navigate Your Documentation The Right Way</h2>
                    <p className="font-secondary text-center text-text-muted mt-4">Your answer is there. You just need to ask.</p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <Button text="Sign Up" variant="secondary" />
                        <Button text="Learn More" variant="learn-more" />
                    </div>
                </article>
                <article className="max-w-240 w-full max-h-160 h-full object-contain">
                    <img className="-rotate-x-45 -rotate-z-20 shadow-hero" src="../../../../src/assets/images/hero-image.png" alt="hero section image" />
                </article>
            </Container>
        </Wrapper>
    )
}