import { Plans } from "../ui/blocks/pricing/plans";
import { Footer } from "../ui/blocks/shared/footer";
import { Navbar } from "../ui/blocks/shared/navbar";

export default function PricingPage() {
    return (
        <main className="w-full bg-bg min-h-screen h-full flex flex-col justify-start items-center">
            <Navbar />
            <h1 className="text-text">Pricing</h1>
            <Plans />
            <Footer />
        </main>
    )
}