import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../userRequest";
import { IUser } from "@/src/shared/types/users";

export const useGetUsers = (initialUsers: IUser[]) => {
    return useInfiniteQuery({
        queryKey: ["users"],
        queryFn: async ({ pageParam = 0, signal }) => fetchUsers(pageParam, signal),

        initialPageParam: 0,

        initialData: {
            pages: [initialUsers],
            pageParams: [0],
        },

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 10) return undefined;
            return allPages.length * 10;
        },

        staleTime: 10_000,
        gcTime: 30_000,
    });
};
