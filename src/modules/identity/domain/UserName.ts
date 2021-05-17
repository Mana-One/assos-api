import { Guard } from "../../core/logic";
import { IdentityErrors } from "./errors";

interface UserNameProps {
    name: string;
}

export namespace UserName {
    export function create(props: UserNameProps){
        Guard.againstNullOrUndefined({
            value: props.name,
            key: "name"
        });

        if(props.name.length <= 0 || props.name.length > 100){
            throw new IdentityErrors.InvalidName();
        }

        return Object.freeze(props);
    }
}