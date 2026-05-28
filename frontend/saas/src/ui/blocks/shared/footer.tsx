import { FooterEmailIcon } from "../../../assets/icons/footer-email";
import { FooterLocationIcon } from "../../../assets/icons/footer-location";

export const Footer = () => {
    return (
        <footer id="contact" className="bg-dark w-full p-6">
            <section className="max-w-300 mx-auto flex flex-col items-start justify-between ">
                <section className="font-secondary max-w-175 w-full flex justify-between text-left">
                    <ul>
                        <li className="mb-6 font-semibold">Quick Links</li>
                        <li className="mb-6 text-[0.875rem]">
                            <a href="#features">Features</a>
                        </li>
                        <li className="mb-6 text-[0.875rem]">
                            <a href="#how-to-use">How To Use</a>
                        </li>
                        <li className="mb-6 text-[0.875rem]">
                            <a href="/pricing">Pricing</a>
                        </li>
                        <li className="mb-6 text-[0.875rem]">
                            <a href="#testimonials">Testimonials</a>
                        </li>
                    </ul>
                    <ul>
                        <li className="mb-6 font-semibold">Company</li>
                        <li className="mb-6 text-[0.875rem]">
                            <a href="">Privacy Policy</a>
                        </li>
                        <li className="mb-6 text-[0.875rem]">
                            <a href="">Terms Of Service</a>
                        </li>
                    </ul>
                    <ul>
                        <li className="mb-6 font-semibold">Contact</li>
                        <li className="mb-6 text-[0.875rem] flex gap-2">
                            <FooterEmailIcon />
                            <a href="mailto:test">info@AutoDoccie.se</a>
                        </li>
                        <li className="mb-6 text-[0.875rem] flex gap-2">
                            <FooterLocationIcon />
                            <span>Gothenburg, Sweden</span>
                        </li>
                    </ul>
                </section>
                <article className="self-end">
                    <p>Copyright something placeholder @2026</p>
                </article>
            </section>
        </footer>
    )
}