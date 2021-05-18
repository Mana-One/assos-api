import { ValueObject } from "../../../core/domain";
import { Either, Guard, left, right } from "../../../core/logic";
import { IdentityErrors } from "./errors";

export interface UserEmailProps {
    value: string;
}

/*export namespace UserEmail {
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
}*/
export class UserEmail extends ValueObject<UserEmailProps> {
    // RFC compliance
    private static emailRegex = new RegExp("^[\\w!#$%&’*+/=?`{|}~^-]+(\?\:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(\?\:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");

    private constructor(props: UserEmailProps){
        super(props);
    }

    getValue(): string {
        return this.props.value;
    }

    static create(email: string): Either<string, UserEmail> {
        const guardresult = Guard.againstNullOrUndefined({
            key: "email",
            value: email 
        });
        if(!guardresult.success){
            return left(guardresult.message);
        }

        if(!this.emailRegex.test(email)){
            return left("Email is not compliant with RFC norm");
        }

        return right(new UserEmail({ value: email }));
    }
}