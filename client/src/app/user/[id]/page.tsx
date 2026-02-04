import { Spinner } from "@/src/shared/ui/spinner";
import CurrentUserPage from "@/src/views/users/current-user.page";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CurrentUser({ params }: PageProps) {
    const par = await params;
    if (!par) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }
    return <CurrentUserPage id={par.id} />;
}
