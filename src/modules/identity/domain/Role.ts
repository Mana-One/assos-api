import { ValueObject } from "../../../core/domain";
import { Either, left, Result, right } from "../../../core/logic";

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

    static create(role: string): Result<Role> {
        if(!isRoleName(role)){
            return Result.ko<Role>("Invalid role name");
        }
        return Result.ok<Role>(new Role({ value: role }));
    }
}