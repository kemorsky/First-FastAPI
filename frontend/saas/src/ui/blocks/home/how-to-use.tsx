export const HowToUse = () => {
    return (
        <div className="bg-gray-400 w-full flex flex-col items-center justify-center">
            <h1>How To Use</h1>
            <div className="bg-gray-400 flex gap-12 items-center justify-between">
                <div className="bg-gray-600 min-w-[30rem] w-full">
                    <img src="" alt="" />
                    <h2>example picture</h2>
                </div>
                <article className="bg-gray-500 min-w-[30rem] w-full flex flex-col items-start p-3">
                    <h2>Instructions</h2>
                    <ul className="list-dist">
                        <li>
                            instruction
                        </li>
                        <li>
                            instruction
                        </li>
                        <li>
                            instruction
                        </li>
                        <li>
                            instruction
                        </li>
                        <li>
                            instruction
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    )
}