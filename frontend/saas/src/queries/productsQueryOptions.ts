import { queryOptions } from "@tanstack/react-query";
import { getPlans } from "../api/api";

export default function createPlansQueryOptions() {
    return queryOptions({
        queryKey: ["plans"],
        queryFn: () => getPlans()
    })
}