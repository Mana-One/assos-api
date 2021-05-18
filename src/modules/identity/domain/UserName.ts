import { ValueObject } from "../../../core/domain";
import { Either, Guard, left, right } from "../../../core/logic";

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

    static create(name: string): Either<string, UserName> {
        const guardResult = Guard.againstNullOrUndefined({
            key: "name",
            value: name
        });

        if(!guardResult.success){
            return left(guardResult.message);
        }

        if(name.length === 0 || 100 < name.length){
            return left("Invalid length for 'name'");
        }

        return right(new UserName({ value: name }));
    }
}