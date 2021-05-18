import { UniqueId } from "../../../core/domain";
import { UserEmail } from "./UserEmail";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export namespace User {
    export function create(props: UserProps, id?: string){
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
            password
        });
    }
}