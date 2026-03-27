import { type User } from "../../../types/types"

export const UserInfoCard = (props: User) => {
    return (
        <div className="bg-gray-600 max-w-95 p-4 gap-4 rounded-2xl w-full flex flex-col items-start justify-start">
            <h1>User Info Card</h1>
            <article className="text-left">
                <p>Name: {props.full_name}</p>
                <p>E-mail: {props.email}</p>
                <p>Disabled: {props.disabled.toString()}</p>
                <p>Created At: {props.created_at}</p>
            </article>
        </div>
    )
}