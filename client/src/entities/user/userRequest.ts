import { API_URL } from "@/src/shared/contants/env.constants";
import { IUser } from "@/src/shared/types/users";

export async function updateUserRequest(
    id: string,
    payload: Partial<{ name: string; email: string }>,
) {
    const res = await fetch(`${API_URL}/user/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Failed to update user");
    }

    return res.json();
}

export const fetchUsers = async (pageParam: number, signal?: AbortSignal) => {
    const res = await fetch(`${API_URL}/user?limit=10&offset=${pageParam}`, {
        signal,
    });
    const json = await res.json();
    return json.data.users;
};

export const fetchCurrentUser = async (
    id: string,
): Promise<{ user: IUser }> => {
    const res = await fetch(`${API_URL}/user/one-user?userId=${id}`);
    const json = await res.json();
    return json.data;
};
