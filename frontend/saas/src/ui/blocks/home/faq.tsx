import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { Collapsible } from "../../components/collapsible"

export const FAQ = () => {
    return (
        <Wrapper className="bg-dark">
            <Container className="w-full min-h-150 flex flex-col items-center gap-4">
                <h1>FAQ</h1>
                <Collapsible 
                            question="What is the benefit of using this software?" 
                            answer="Using AutoDoccie keeps all of your personal data in one place. Think of it as your local library, albeit smarter, faster, and customized to your needs." />
                <Collapsible 
                            question="What happens if my subscribtion runs out, or I opt out of using the software?" 
                            answer="In the event of an expired subscription you will not receive a renewed access key and the search features will be effectively locked.
                            If you choose not to renew your subscription, or opt out of using AutoDoccie entirely, you can choose to empty the data bank and uninstall the software." />
                <Collapsible 
                            question="Can AutoDoccie run without an internet connection?" 
                            answer="Yes, the software can run offline, but it is not advised to do so in the long run as there may problems in synchronizing your access token with the server." />
            </Container>
        </Wrapper>
    )
}