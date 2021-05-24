import { ValueObject } from "../../core/domain";
import { Guard, Result } from "../../core/logic";

interface UserEmailProps {
    value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
    // RFC compliance
    private static emailRegex = new RegExp("^[\\w!#$%&’*+/=?`{|}~^-]+(\?\:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(\?\:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");

    private constructor(props: UserEmailProps){
        super(props);
    }

    getValue(): string {
        return this.props.value;
    }

    static create(email: string): Result<UserEmail> {
        const guardresult = Guard.againstNullOrUndefined({
            key: "email",
            value: email 
        });
        if(!guardresult.success){
            return Result.ko<UserEmail>(guardresult.message);
        }

        if(!this.emailRegex.test(email)){
            return Result.ko<UserEmail>("Email is not compliant with RFC norm");
        }

        return Result.ok<UserEmail>(new UserEmail({ value: email }));
    }
}