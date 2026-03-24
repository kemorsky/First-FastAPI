import { queryOptions } from "@tanstack/react-query";
import { getPlans } from "../api/api";

export default function plansQueryOptions() {
    return queryOptions({
        queryKey: ["plans"],
        queryFn: () => getPlans()
    })
};