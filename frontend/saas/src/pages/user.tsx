import { UserInfo } from "../ui/blocks/user/user-info";
import { Footer } from "../ui/blocks/shared/footer";
// import { Navbar } from "../ui/blocks/shared/navbar";

export default function UserPage() {
    return (
        <main className="w-full bg-bg min-h-screen h-full flex flex-col justify-start items-center">
            {/* <Navbar /> */}
            <UserInfo />
            <Footer />
        </main>
    )
}