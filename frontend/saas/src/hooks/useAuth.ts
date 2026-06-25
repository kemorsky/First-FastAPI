import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../queries/userQueryOptions";
import { useNavigate } from "react-router";

export default function useAuth() {
    const { data: user, isLoading, isPending, error } = useQuery({
        ...userQueryOptions(), 
    });
    const navigate = useNavigate();

    const redirectMissingAuth = () => {
        navigate("/access-denied");
    }

    return {
        user,
        isLoading,
        isPending,
        error,
        redirectMissingAuth
    };
}