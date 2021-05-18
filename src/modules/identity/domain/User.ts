import { UniqueId, UniqueIdProps } from "../../../core/domain";
import { Role } from "./Role";
import { UserEmail, UserEmailProps } from "./UserEmail";
import { UserName, UserNameProps } from "./UserName";
import { UserPassword, UserPasswordProps } from "./UserPassword";

interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export namespace User {
    export type Type = {
        id: UniqueIdProps;
        firstName: UserNameProps;
        lastName: UserNameProps;
        email: UserEmailProps;
        password: UserPasswordProps;
        Role: Role.Type
    }

    export function create(props: UserProps, Role: Role.Type, id?: string): Type {
        const uid = UniqueId.create(id);
        const firstName = UserName.create(props.firstName);
        const lastName = UserName.create(props.lastName);
        const email = UserEmail.create(props.email);
        const password = UserPassword.create(props.password); 

        return Object.freeze({
            id: uid,
            firstName,
            lastName,
            email,
            password,
            Role
        });
    }
}