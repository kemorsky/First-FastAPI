import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { Button } from "../../shared/buttons"

export const ReadyToJoin = () => {
    return (
        <Wrapper>
            <Container className="flex flex-col items-center gap-10">
                <h1>Ready To Join?</h1>
                <Button text="Learn More" variant="learn-more"/>
            </Container>
        </Wrapper>
    )
}