import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { Button } from "../../shared/buttons"

export const ReadyToJoin = () => {
    return (
        <Wrapper>
            <Container className="flex flex-col items-center gap-10">
                <article>
                    <h1 className="text-4xl font-bold font-primary mb-2">Stop wasting time on tedious blockers</h1>
                    <h2 className="font-secondary text-text-muted">Let something else do it for you</h2>
                </article>
                <a href="/pricing"> 
                    <Button text="See pricing" variant="learn-more"/>
                </a>
            </Container>
        </Wrapper>
    )
}