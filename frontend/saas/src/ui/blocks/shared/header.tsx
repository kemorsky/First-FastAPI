import { useState, useEffect } from "react"
import { signIn } from '../../../api/api';
import { Button } from "../../shared/buttons"
import useAuth from "../../../hooks/useAuth";

export const Header = () => {
    const { user, isPending } = useAuth();

    const [isScrolled, setIsScrolled] = useState(false);

    const handleSignIn = async () => {
        await signIn();
    };

    useEffect(() => { // ver 0.2, replace scroll listener with intersection observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting)
            },
            { threshold: 0 }
        )
        const sentinel = document.getElementById("scroll-trigger");
        if (sentinel) { observer.observe(sentinel)}

        return () => observer.disconnect();
    }, []);
    
    return (
        <header className={`z-70 w-full flex justify-center items-center py-6 transition-all ease-in-out duration-300 fixed 
                            ${isScrolled ? 'py-8 bg-card/40 backdrop-blur-lg px-5' : 'top-0 bg-bg'}
                        `}>
            <nav className="max-w-360 w-full flex justify-between items-center">
                <section className="w-full max-w-60 px-4">
                    <a href="/">
                        <article>
                            Logo
                        </article>
                    </a>
                </section>
                <section className="w-full max-w-60 flex gap-8">
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
                <section className="w-full max-w-60">
                    {isPending ? null : !user ? (
                        <section className="flex items-center justify-center gap-4 px-4">
                            <Button onClick={() => handleSignIn()} text="Sign In" variant="primary" />
                            {/* <Button text="Sign Up" variant="secondary" /> */}
                        </section>
                    ) : (
                        <section className="flex items-center gap-4 px-4">
                            <a href="/user">
                                <img 
                                    className="w-10 h-10 rounded-full"
                                    src={user?.picture.toString()} 
                                    alt="user profile image" width={40} height={40}/>
                            </a>
                            <p>{user?.full_name}</p>
                        </section>
                    )}
                </section>
            </nav>
        </header>
    )
}