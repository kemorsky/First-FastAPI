export const Hero = () => {
    return (
        <div className="bg-gray-500 w-full min-h-[33rem] h-full flex items-center justify-center">
            <section className="w-full h-full flex justify-between items-start">
                <article className="max-w-[25rem] max-h-[33rem] h-full h-full">
                    <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>
                    <p>Deserunt natus non recusandae? Perspiciatis, ea pariatur labore natus autem tempora earum quo deserunt at et laboriosam sequi? Architecto magnam porro reprehenderit!</p>
                    <div>
                        <button>Learn More</button>
                        <button>Sign In</button>
                    </div>
                </article>
                <article className="max-w-[40rem] w-full max-h-[33rem] h-full bg-gray-200 ">
                    <img src="" alt="" />
                    <h1>hero picture goes here</h1>
                </article>
            </section>
        </div>
    )
}