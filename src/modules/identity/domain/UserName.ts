import { ValueObject } from "../../../core/domain";
import { Either, Guard, left, right } from "../../../core/logic";
import { IdentityErrors } from "./errors";

/*export interface UserNameProps {
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
}*/

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