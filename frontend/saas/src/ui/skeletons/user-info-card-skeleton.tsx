import Spinner from "../shared/spinner";

export default function UserInfoCardSkeleton() {
    return (
        <div className="bg-gray-600 w-full max-w-120 p-4 gap-4 rounded-2xl flex flex-col items-start justify-start">
            <Spinner />
        </div>
    )
}