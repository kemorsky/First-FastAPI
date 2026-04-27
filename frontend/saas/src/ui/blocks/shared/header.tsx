import { Activity, useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueryOptions } from '../../../queries/userQueryOptions';
import { signIn } from '../../../api/api';
import { Button } from "../../shared/buttons"

export const Header = () => {
    const queryClient = useQueryClient()

    const { data: user } = useQuery(userQueryOptions());

    if (!user) console.log("Sign In");

    console.log(user)

    const [isScrolled, setIsScrolled] = useState(false);

    const handleSignIn = async () => {
        await signIn();
        queryClient.invalidateQueries({ queryKey: ["user"] });
    };

    useEffect(() => { // initial setup, ver 0.1 basically
        const handleScroll = () => {
            const scrolled = window.scrollY > 105; 
            setIsScrolled(scrolled);
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            if (window) {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, []);
    
    return (
        <header className={`w-full max-w-360 py-6 transition-all ease-in-out duration-300 fixed ${isScrolled ? 'py-8 bg-bg-light backdrop-blur-lg px-5 rounded-xl' : 'top-0 bg-bg'}`}>
            <nav className="w-full flex justify-between items-center">
                <section className="flex items-center gap-16">
                    <section className="px-4">
                        <article>
                            Logo
                        </article>
                    </section>
                    <section className="flex gap-8">
                        <a href="/#features">
                            <p className="font-semibold text-text hover:text-text-muted transition-colors">
                                Features
                            </p>
                        </a>
                        <a href="/pricing">
                            <p className="font-semibold text-text hover:text-text-muted transition-colors">
                                Pricing
                            </p>
                        </a>
                        <a href="/#contact">
                            <p className="font-semibold text-text hover:text-text-muted transition-colors">
                                Contact
                            </p>
                        </a>
                    </section>
                </section>
                <Activity mode={!user ? "visible" : "hidden"}>
                    <section className="flex gap-4 px-4">
                        <Button onClick={() => handleSignIn()} text="Sign In" variant="primary" />
                        <Button text="Sign Up" variant="secondary" />
                    </section>
                </Activity>
                <Activity mode={user ? "visible" : "hidden"}>
                    <section className="flex items-center gap-4 px-4">
                        <a href="/user">
                            <img 
                                className="w-10 h-10 rounded-full"
                                src={user?.picture.toString()} 
                                alt="user profile image" width={40} height={40}/>
                        </a>
                        <p>{user?.full_name}</p>
                    </section>
                </Activity>
            </nav>
        </header>
    )
}