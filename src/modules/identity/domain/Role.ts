import { ValueObject } from "../../../core/domain";
import { Either, left, right } from "../../../core/logic";

export enum RoleName {
    DONATOR = "donator",
    VOLUNTEER = "volunteer",
    MANAGER = "manager",
    ADMIN = "admin"
}

function isRoleName(value: any): value is RoleName {
    return value === RoleName.DONATOR ||
        value === RoleName.MANAGER ||
        value === RoleName.VOLUNTEER ||
        value === RoleName.ADMIN;
}

interface RoleProps {
    value: RoleName;
}

export class Role extends ValueObject<RoleProps> {
    private constructor(props: RoleProps){
        super(props);
    }

    getValue(): RoleName {
        return this.props.value;
    }

    static create(role: string): Either<string, Role> {
        if(!isRoleName(role)){
            return left("Invalid role name");
        }
        return right(new Role({ value: role }));
    }
}