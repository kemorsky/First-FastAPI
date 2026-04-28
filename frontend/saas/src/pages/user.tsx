import { UserInfo } from "../ui/blocks/user/user-info";
import { Footer } from "../ui/blocks/shared/footer";
import { Header } from "../ui/blocks/shared/header";

export default function UserPage() {
    return (
        <main className="w-full bg-bg min-h-screen h-full flex flex-col justify-start items-center">
            <Header />
            <h1>User</h1>
            <UserInfo />
            <Footer />
        </main>
    )
}