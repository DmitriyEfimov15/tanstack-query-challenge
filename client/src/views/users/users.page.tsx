import { getInitialUsers } from "@/src/entities/user/server-actions/getInitialUsers";
import { UsersList } from "@/src/features/users/ui/users-list";

export default async function UsersPage() {
    const res = await getInitialUsers();
    const initialUsers = Array.isArray(res.data.users) ? res.data.users : [];

    return <UsersList initialUsers={initialUsers} />;
}
