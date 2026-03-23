import { FeaturesCard } from "../../components/cards/features-card"

export const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <h1>Features</h1>
            <section className="flex items-center justify-center gap-8">
                <FeaturesCard />
                <FeaturesCard />
            </section>
            <section className="flex items-center justify-center gap-8">
                <FeaturesCard />
                <FeaturesCard />
            </section>
        </div>
    )
}