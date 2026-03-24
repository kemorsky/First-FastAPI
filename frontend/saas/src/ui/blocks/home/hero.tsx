import { Button } from "../../shared/buttons"

export const Hero = () => {
    return (
        <div className="bg-gray-500 w-full min-h-132 h-full flex items-center justify-center">
            <section className="w-full h-full flex justify-between items-start">
                <article className="max-w-100 max-h-132 h-full flex flex-col items-center justify-center gap-4">
                    <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>
                    <p>Deserunt natus non recusandae? Perspiciatis, ea pariatur labore natus autem tempora earum quo deserunt at et laboriosam sequi? Architecto magnam porro reprehenderit!</p>
                    <div className="flex gap-3">
                        <Button text="Learn More" variant="secondary" />
                        <Button text="Sign In" variant="primary" />
                    </div>
                </article>
                <article className="max-w-160 w-full max-h-132 h-full bg-gray-200 ">
                    <img src="" alt="" />
                    <h1>hero picture goes here</h1>
                </article>
            </section>
        </div>
    )
}