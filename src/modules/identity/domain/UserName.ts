import { ValueObject } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";

interface UserNameProps {
    value: string;
}

export class UserName extends ValueObject<UserNameProps> {
    private constructor(props: UserNameProps){
        super(props);
    }

    getValue(): string {
        return this.props.value;
    }

    static create(name: string): Result<UserName> {
        const guardResult = Guard.againstNullOrUndefined({
            key: "name",
            value: name
        });

        if(!guardResult.success){
            return Result.ko<UserName>(guardResult.message);
        }

        if(name.length === 0 || 100 < name.length){
            return Result.ko<UserName>("Invalid length for 'name'");
        }

        return Result.ok<UserName>(new UserName({ value: name }));
    }
}