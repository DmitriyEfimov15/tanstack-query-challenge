"use client";

import { IUsersListProps } from "../models/types";
import { UserCard } from "@/src/shared/ui/user-card";
import { useRef, useState } from "react";
import { EditUserModal } from "./edit-user-modal";
import { IUser } from "@/src/shared/types/users";
import { useInfinityScroll } from "@/src/shared/hooks/useInfinityScroll";
import { Spinner } from "@/src/shared/ui/spinner";
import { useGetUsers } from "@/src/entities/user/hooks/useGetUsers";
import { Button } from "@/src/shared/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function UsersList({ initialUsers }: IUsersListProps) {
    const queryClient = useQueryClient();
    const router = useRouter()

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useGetUsers(initialUsers);

    const users = data?.pages.flat() ?? [];

    useInfinityScroll({
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        loadMoreRef,
    });

    const handleOpenEditModal = (user: IUser) => {
        setEditingUser(user);
    };

    const handleCloseEditModal = () => {
        setEditingUser(null);
    };

    const handleCancelUserRequest = () => {
        queryClient.cancelQueries({queryKey: ['users']})
    }

    const handleRemoveQueriesUser = () => {
        queryClient.removeQueries({queryKey: ['users']})
    }

    const handleRefetchUserRequest = () => {
        queryClient.refetchQueries({queryKey: ['users']})
    }

    const handleInvalidateUser = () => {
        queryClient.invalidateQueries({queryKey: ['users']})
    }

    const handleUserCardClick = (id: string) => {
        router.push(`/user/${id}`)
    }


    return (
        <div className="flex flex-col gap-2 mx-auto w-[80%]">
            <Button onClick={handleCancelUserRequest}>Отменить запрос</Button>
            <Button onClick={handleRemoveQueriesUser} variant="secondary">Очистить кэш</Button>
            <Button onClick={handleRefetchUserRequest} variant="outline">Перезапросить данные</Button>
            <Button onClick={handleInvalidateUser} variant="destructive">Инвалидировать данные</Button>

            <h1>Список пользователей</h1>

            {users.map((user) => (
                <UserCard
                    key={user.id}
                    avatar={user.avatar}
                    email={user.email}
                    name={user.name}
                    id={user.id}
                    onDelete={() => console.log("delete")}
                    onEdit={() => handleOpenEditModal(user)}
                    onCardClick={handleUserCardClick}
                />
            ))}

            <div ref={loadMoreRef} className="h-6" />

            {editingUser && (
                <EditUserModal
                    defaultValues={editingUser}
                    onClose={handleCloseEditModal}
                />
            )}

            {isFetching && (
                <div className="w-full flex justify-center">
                    <Spinner />
                </div>
            )}
        </div>
    );
}
