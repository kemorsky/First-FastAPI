import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { Collapsible } from "../../components/collapsible"

export const FAQ = () => {
    return (
        <Wrapper className="bg-gray-500">
            <Container className="w-full flex flex-col items-center gap-4">
                <h1>FAQ</h1>
                <Collapsible question="Testing whether this collapsible will work?" answer="If you're seeing this, then it will!" />
                <Collapsible question="Testing whether this collapsible will work?" answer="If you're seeing this, then it will!" />
                <Collapsible question="Testing whether this collapsible will work?" answer="If you're seeing this, then it will!" />
            </Container>
        </Wrapper>
    )
}