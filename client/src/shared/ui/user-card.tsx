"use client";

import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./button";

interface IUserCardProps {
    avatar?: string;
    name: string;
    email: string;
    id: string;
    onCardClick: (id: string) => void;
    onEdit: () => void;
    onDelete: () => void;
}

export const UserCard: FC<IUserCardProps> = ({
    avatar,
    name,
    email,
    id,
    onCardClick,
    onEdit,
    onDelete,
}) => {
    return (
        <div onClick={() => onCardClick(id)} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-background">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium text-gray-900">{name}</div>
                    <div className="text-sm text-gray-500">{email}</div>
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    onClick={onEdit}
                    variant="outline"
                    size="icon"
                    className="cursor-pointer"
                >
                    <Edit className="w-5 h-5" />
                </Button>
                <Button
                    variant="destructive"
                    size="icon"
                    className="cursor-pointer"
                    onClick={onDelete}
                >
                    <Trash2 className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};
