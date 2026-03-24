import { Plans } from "../ui/blocks/pricing/plans";
import { Footer } from "../ui/blocks/shared/footer";
import { Header } from "../ui/blocks/shared/header";

export default function PricingPage() {
    return (
        <main className="max-w-360 w-full min-h-screen h-full bg-orange-200 flex flex-col justify-start items-center">
            <Header />
            <h1>Pricing</h1>
            <Plans />
            <Footer />
        </main>
    )
}