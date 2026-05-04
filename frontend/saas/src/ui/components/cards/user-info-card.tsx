import { type User } from "../../../types/types"
import HorizontalRule from "../../shared/horizontal-rule";

export const UserInfoCard = (props: User) => {
    const date = new Date(props.created_at);

    return (
        <div className="bg-gray-600 w-full max-w-120 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
            <section className="flex justify-center items-start gap-3">
                <img className="w-10 h-10 rounded-full bg-blue-200"
                    src={props.picture.toString()}
                    alt="user profile image" width={40} height={40}
               />
                <p className="text-[1.125rem] font-semibold">{props.full_name}</p>
            </section>
            <HorizontalRule />
            <article className="text-left">
                <p className="mt-2">
                    <span className="w-15 inline-block">E-mail</span>
                    <span className="ml-12">{props.email}</span> 
                </p>
                <p className="mt-2">
                    <span className="w-15 inline-block">Joined</span>
                    <span className="ml-12">{date.toLocaleString()}</span> 
                </p>
                <p className="mt-2">
                    <span className="w-15 inline-block">Status</span>
                    <span className="ml-12">{props.disabled.toString()}</span> 
                </p>
            </article>
        </div>
    )
}