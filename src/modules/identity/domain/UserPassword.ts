import { Guard } from "../../../core/logic";
import { IdentityErrors } from "./errors";
import bcrypt from "bcryptjs";

export interface UserPasswordProps {
    isHashed: boolean;
    value: string;
}

const strongRegex = new RegExp(/(?=^.{8,32}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])/g);

export namespace UserPassword {
    export function create(password: string, isHashed: boolean = false) {
        Guard.againstNullOrUndefined({
            value: password,
            key: "password"
        });
    
        if(!isHashed && !strongRegex.test(password)){
            throw new IdentityErrors.InvalidPassword();
        }
    
        return Object.freeze({ value: password, isHashed });
    }

    export async function hash(pwd: UserPasswordProps): Promise<UserPasswordProps>{
        if(!pwd.isHashed){
            const password = await bcrypt.hash(pwd.value, 10);
            return Object.freeze({
                isHashed: true,
                value: password
            });
        }

        return pwd;
    }

    export async function compare(clearPassword: string, pwd: UserPasswordProps): Promise<boolean> {
        if(!pwd.isHashed){
            return pwd.value === clearPassword;
        }

        return bcrypt.compare(clearPassword, pwd.value);
    }
}
