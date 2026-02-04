"use client";

import { Button } from "@/src/shared/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { TCurrentUserInfoProps } from "../models/types";
import { useGetOneUser } from "@/src/entities/user/hooks/useGetOneUser";

const CurrentUserInfo: FC<TCurrentUserInfoProps> = ({ id }) => {
    const router = useRouter();

    const { data } = useGetOneUser(id);

    const handleBack = () => {
        router.push("/");
    };

    return (
        <div className="h-screen w-full flex justify-center items-center flex-col">
            <span>email: {data}</span>
            <Button onClick={handleBack}>Назад</Button>
        </div>
    );
};

export default CurrentUserInfo;
