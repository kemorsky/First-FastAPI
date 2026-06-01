import { Plans } from "../ui/blocks/pricing/plans";
import { Footer } from "../ui/blocks/shared/footer";
import { Header } from "../ui/blocks/shared/header";

export default function PricingPage() {
    return (
        <main className="w-full bg-bg min-h-screen h-full flex flex-col justify-start items-center">
            <Header />
            <h1 className="text-text">Pricing</h1>
            <Plans />
            <Footer />
        </main>
    )
}