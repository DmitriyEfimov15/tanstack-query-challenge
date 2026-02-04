import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRequest } from "../userRequest";
import { IUserEditForm } from "@/src/features/users/models/types";
import { InfiniteData } from "@tanstack/react-query";
import { IUser } from "@/src/shared/types/users";

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: IUserEditForm }) =>
            updateUserRequest(id, payload),

        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: ["users"] });

            const previousData = queryClient.getQueryData<
                InfiniteData<IUser[]>
            >(["users"]);

            queryClient.setQueryData<InfiniteData<IUser[]>>(
                ["users"],
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        pages: old.pages.map((page) =>
                            page.map((user) =>
                                user.id === id ? { ...user, ...payload } : user,
                            ),
                        ),
                    };
                },
            );

            return { previousData };
        },

        onError: (_err, _vars, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["users"], context.previousData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
