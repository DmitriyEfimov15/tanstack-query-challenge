import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../userRequest";

export const useGetOneUser = (id: string) => {
    return useQuery({
        queryKey: ["oneUser"],
        queryFn: () => fetchCurrentUser(id),
        select: (data) => data.user.email,
        staleTime: 10_000,
        gcTime: 30_000,
    });
};
