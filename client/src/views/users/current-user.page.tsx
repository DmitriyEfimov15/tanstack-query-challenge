import CurrentUserInfo from "@/src/features/users/ui/current-user";

export default async function CurrentUserPage({ id }: { id: string }) {
    return <CurrentUserInfo id={id} />;
}
