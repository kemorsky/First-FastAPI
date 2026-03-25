import { Activity } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueryOptions } from '../../../queries/userQueryOptions';
import { signIn } from '../../../api/api';
import { Button } from "../../shared/buttons"

export const Header = () => {
    const queryClient = useQueryClient()

    const { data: user, isLoading } = useQuery(userQueryOptions());

    const handleSignIn = async () => {
        await signIn();
        queryClient.invalidateQueries({ queryKey: ["user"] });
    };

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
                        <a href="/#features">
                            <article>
                                Features
                            </article>
                        </a>
                        <a href="/pricing">
                            <article>
                                Pricing
                            </article>
                        </a>
                        <a href="/#contact">
                            <article>
                                Contact
                            </article>
                        </a>
                    </section>
                </section>
                <section className="flex gap-4 px-4">
                    <Button onClick={() => handleSignIn()} text="Sign In" variant="primary" />
                    <Button text="Sign Up" variant="secondary" />
                </section>
                <section>
                    <p>{user?.full_name}</p>
                </section>
            </nav>
        </header>
    )
}