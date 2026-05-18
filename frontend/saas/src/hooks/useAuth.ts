import { useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../queries/userQueryOptions";

export default function useAuth() {
    const { data: user, isLoading: isUserLoading } = useSuspenseQuery({
        ...userQueryOptions(),
    });

    return {user};
}