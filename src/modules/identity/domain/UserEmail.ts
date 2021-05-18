import { Guard } from "../../../core/logic";
import { IdentityErrors } from "./errors";

export interface UserEmailProps {
    value: string;
}

export namespace UserEmail {
    const emailRegex = new RegExp("^[\\w!#$%&’*+/=?`{|}~^-]+(\?\:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(\?\:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");

    export function create(value: string){
        Guard.againstNullOrUndefined({
            value,
            key: "email"
        });

        value = value.trim();

        // test RFC compliance
        if(!emailRegex.test(value)){
            throw new IdentityErrors.InvalidEmail();
        }

        return Object.freeze({ value })
    }
}