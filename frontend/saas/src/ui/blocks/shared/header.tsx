import { Button } from "../../shared/buttons"

export const Header = () => {
    return (
        <header className="w-full bg-red-300 py-6 ">
            <nav className="w-full flex justify-between items-center">
                <section className="flex items-center gap-16">
                    <section className="px-4">
                        <article>
                            Logo
                        </article>
                    </section>
                    <section className="flex gap-8">
                        <a href="">
                            <article>
                                Features
                            </article>
                        </a>
                        <a href="">
                            <article>
                                Pricing
                            </article>
                        </a>
                        <a href="">
                            <article>
                                Contact
                            </article>
                        </a>
                    </section>
                </section>
                <section className="flex gap-4 px-4">
                    <Button text="Sign In" variant="primary" />
                    <Button text="Sign Up" variant="secondary" />
                </section>
            </nav>
        </header>
    )
}