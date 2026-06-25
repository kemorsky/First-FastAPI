import { Footer } from "../ui/blocks/shared/footer";
import { Navbar } from "../ui/blocks/shared/navbar";
import Wrapper from "../ui/shared/wrapper";

export default function AccessDeniedPage() {
    return (
        <main className="w-full bg-bg min-h-screen h-full flex flex-col justify-start items-center">
            <Navbar />
            <Wrapper className="pt-20 text-text">
                <h1 className="text-text">Access denied</h1>
                <p>You do not have access to this page</p>
            </Wrapper>
            <Footer />
        </main>
    )
}