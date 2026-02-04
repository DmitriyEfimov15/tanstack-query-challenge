"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/src/shared/ui/dialog";
import { Field, FieldGroup } from "@/src/shared/ui/field";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { IEditUserModalProps, IUserEditForm } from "../models/types";
import { useUpdateUserMutation } from "@/src/entities/user/hooks/useUpdateUser";
import { Button } from "@/src/shared/ui/button";

export const EditUserModal: FC<IEditUserModalProps> = ({
    defaultValues,
    onClose,
}) => {
    const { register, handleSubmit } = useForm<IUserEditForm>({
        defaultValues,
    });
    const updateUserMutation = useUpdateUserMutation();

    const onSubmit = (payload: IUserEditForm) => {
        updateUserMutation.mutate(
            { id: defaultValues.id, payload },
            {
                onSettled() {
                    onClose();
                },
            },
        );
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Редактирование пользователя</DialogTitle>
                        <DialogDescription>
                            Измените данные о пользователе
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label>Имя пользователя</Label>
                            <Input {...register("name")} />
                        </Field>
                        <Field>
                            <Label>Почта пользователя</Label>
                            <Input {...register("email")} />
                        </Field>
                    </FieldGroup>
                    <Button className="w-full mt-5" type="submit">
                        Сохранить
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
