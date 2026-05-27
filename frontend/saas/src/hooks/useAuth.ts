import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../queries/userQueryOptions";

export default function useAuth() {
    const { data: user, isLoading, isPending, error } = useQuery({
        ...userQueryOptions(), 
    });

    return {
        user,
        isLoading,
        isPending,
        error
    };
}