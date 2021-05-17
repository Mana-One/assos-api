import { Guard } from "../../core/logic";
import { IdentityErrors } from "./errors";
import bcrypt from "bcryptjs";

interface UserPasswordProps {
    isHashed: boolean;
    password: string;
}

const strongRegex = new RegExp(/(?=^.{8,32}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])/g);

export namespace UserPassword {
    export function create(props: UserPasswordProps) {
        Guard.againstNullOrUndefined({
            value: props.password,
            key: "password"
        });
    
        if(!props.isHashed && !strongRegex.test(props.password)){
            throw new IdentityErrors.InvalidPassword();
        }
    
        return Object.freeze(props);
    }

    export async function hash(pwd: UserPasswordProps): Promise<UserPasswordProps>{
        if(!pwd.isHashed){
            const password = await bcrypt.hash(pwd.password, 10);
            return Object.freeze({
                isHashed: true,
                password
            });
        }

        return pwd;
    }

    export async function compare(clearPassword: string, pwd: UserPasswordProps): Promise<boolean> {
        if(!pwd.isHashed){
            return pwd.password === clearPassword;
        }

        return bcrypt.compare(clearPassword, pwd.password);
    }
}
