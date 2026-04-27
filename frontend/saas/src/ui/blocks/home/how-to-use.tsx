import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"

export const HowToUse = () => {
    return (
        <Wrapper className="bg-bg">
            <Container className="w-full flex flex-col items-center justify-center gap-10">
                <h1>How To Use</h1>
                <div className="flex gap-12 items-center justify-between">
                    <div className="border border-border rounded-xl min-w-120 h-80 w-full">
                        {/* <img src="" alt="" /> */}
                    </div>
                    <article className="min-w-120 w-full flex flex-col items-start p-3">
                        <p className="text-left text-[1.125rem] text-text">From setup to usage stage, the software is very easy and intuitive to use:</p>
                        <ul className="list-dist">
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                            <li className="mb-4 text-text-muted">
                                step: instruction
                            </li>
                        </ul>
                    </article>
                </div>
            </Container>
        </Wrapper>
    )
}