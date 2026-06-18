// import HorizontalRule from "../../shared/horizontal-rule";
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
        <div className="text-text w-full max-w-120 gap-4 rounded-2xl flex flex-col items-start justify-start">
            <section className="w-full flex flex-col md:flex-row gap-4">
                <section className="flex justify-start items-start gap-3">
                    <img className="w-14 h-14 rounded-full bg-blue-200"
                        src={props.user.picture.toString()}
                        alt="user profile image" width={40} height={40}
                />
                    
                </section>
                <article className="text-left font-secondary">
                    <p className="text-[1.25rem] font-semibold">{props.user.full_name}</p>
                    <p className="mt-3">
                        {props.user.email}
                    </p>
                    <p className="mt-1">
                        
                        Joined {date.toLocaleString()}
                    </p>
                    <button className="mt-3 text-left cursor-pointer" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </article>

            </section>
        </div> 
    )
}