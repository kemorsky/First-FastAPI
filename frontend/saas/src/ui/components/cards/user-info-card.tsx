import HorizontalRule from "../../shared/horizontal-rule";
import { signOut } from "../../../api/api";
import type { User } from "../../../types/types";

type Props = {
    user: User;
}

export const UserInfoCard = (props: Props) => {

    const date = new Date(props.user.created_at);

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="bg-gray-600 w-full max-w-120 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
            <section className="flex justify-center items-start gap-3">
                <img className="w-10 h-10 rounded-full bg-blue-200"
                    src={props.user.picture.toString()}
                    alt="user profile image" width={40} height={40}
               />
                <p className="text-[1.125rem] font-semibold">{props.user.full_name}</p>
            </section>
            <HorizontalRule />
            <article className="text-left">
                <p className="mt-2">
                    <span className="w-15 inline-block">E-mail</span>
                    <span className="ml-12">{props.user.email}</span> 
                </p>
                <p className="mt-2">
                    <span className="w-15 inline-block">Joined</span>
                    <span className="ml-12">{date.toLocaleString()}</span> 
                </p>
                <p className="mt-2">
                    <span className="w-15 inline-block">Status</span>
                    <span className="ml-12">{props.user.disabled.toString()}</span> 
                </p>
            </article>
            <button className="mt-3 text-left cursor-pointer" onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}