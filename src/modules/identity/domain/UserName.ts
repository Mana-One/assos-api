import { Guard } from "../../../core/logic";
import { IdentityErrors } from "./errors";

export interface UserNameProps {
    value: string;
}

export namespace UserName {
    export function create(value: string){
        Guard.againstNullOrUndefined({
            value,
            key: "name"
        });

        value = value.trim();

        if(value.length <= 0 || value.length > 100){
            throw new IdentityErrors.InvalidName();
        }

        return Object.freeze({ value });
    }
}