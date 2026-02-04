import { IUser } from "@/src/shared/types/users";

export interface IUsersListProps {
    initialUsers: IUser[];
}

export interface IUserEditForm {
    name: string;
    email: string;
}

export interface IDefaultUserValues extends IUserEditForm {
    id: string;
}

export interface IEditUserModalProps {
    defaultValues: IDefaultUserValues;
    onClose: () => void;
}

export interface TCurrentUserInfoProps {
    id: string;
}
