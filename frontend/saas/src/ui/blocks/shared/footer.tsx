import { FooterEmailIcon } from "../../../assets/icons/footer-email";
import { FooterLocationIcon } from "../../../assets/icons/footer-location";

export const Footer = () => {
    return (
        <footer id="contact" className="bg-dark w-full p-6">
            <section className="max-w-300 mx-auto flex flex-col items-start justify-between ">
                <section className="font-secondary max-w-175 w-full flex flex-wrap gap-4 md:gap-0 justify-between text-left">
                    <ul>
                        <li className="mb-6 font-semibold text-text">Quick Links</li>
                        <li className="mb-6 text-[0.875rem] text-text-muted">
                            <a href="#features">Features</a>
                        </li>
                        <li className="mb-6 text-[0.875rem] text-text-muted">
                            <a href="#how-to-use">How To Use</a>
                        </li>
                        <li className="mb-6 text-[0.875rem] text-text-muted">
                            <a href="/pricing">Pricing</a>
                        </li>
                        <li className="mb-6 text-[0.875rem] text-text-muted">
                            <a href="#testimonials">Testimonials</a>
                        </li>
                    </ul>
                    <ul>
                        <li className="mb-6 font-semibold text-text">Company</li>
                        <li className="mb-6 text-[0.875rem] text-text-muted">
                            <a href="">Privacy Policy</a>
                        </li>
                        <li className="mb-6 text-[0.875rem] text-text-muted">
                            <a href="">Terms Of Service</a>
                        </li>
                    </ul>
                    <ul>
                        <li className="mb-6 font-semibold text-text">Contact</li>
                        <li className="mb-6 text-[0.875rem] flex gap-2 text-text-muted">
                            <FooterEmailIcon />
                            <a href="mailto:test">info@AutoDoccie.se</a>
                        </li>
                        <li className="mb-6 text-[0.875rem] flex gap-2 text-text-muted">
                            <FooterLocationIcon />
                            <span>Gothenburg, Sweden</span>
                        </li>
                    </ul>
                </section>
                <article className="self-center md:self-end text-text-muted mt-4">
                    <p>Copyright something placeholder @2026</p>
                </article>
            </section>
        </footer>
    )
}