import { Guard, Result } from "../../core/logic";
import bcrypt from "bcryptjs";
import { ValueObject } from "../../core/domain";

export interface UserPasswordProps {
    isHashed: boolean;
    value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
    private static strongRegex = new RegExp(/(?=^.{8,32}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])/g);

    private constructor(props: UserPasswordProps){
        super(props);
    }

    getValue(): string {
        return this.props.value;
    }

    isAlreadyHashed(): boolean {
        return this.props.isHashed;
    }

    async comparePassword(plain: string): Promise<boolean> {
        if(this.props.isHashed){
            return bcrypt.compare(plain, this.props.value);
        }
        return this.props.value === plain;
    }

    async hashPassword(): Promise<string> {
        if(this.props.isHashed){
            return this.props.value;
        }
        return bcrypt.hash(this.props.value, 10);
    }

    static createNotHashed(password: string){
        return this.create(password, false);
    }

    static createHashed(password: string){
        return this.create(password, true);
    }

    private static create(password: string, isHashed: boolean): Result<UserPassword> {
        const guardResult = Guard.againstNullOrUndefined({
            key: "password",
            value: password
        });
        if(!guardResult.success){
            return Result.ko<UserPassword>(guardResult.message);
        }

        if(!isHashed && !this.strongRegex.test(password)){
            return Result.ko<UserPassword>("Invalid length or format for password");
        }

        return Result.ok<UserPassword>(new UserPassword({ value: password, isHashed }));
    }
}
