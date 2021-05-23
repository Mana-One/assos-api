import { Entity, UniqueId } from "../../../core/domain";
import { Result } from "../../../core/logic";
import { AssociationId } from "./AssociationId";
import { Role } from "./Role";
import { UserEmail } from "./UserEmail";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

interface UserProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
    role: Role;
    associationId: AssociationId | null;
}

interface UserCreationProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
    role?: Role,
    associationId?: AssociationId;
}

export class User extends Entity<UserProps> {
    getId(): UniqueId {
        return this._id;
    }

    getFirstName(): UserName {
        return this.props.firstName;
    }

    getLastName(): UserName {
        return this.props.lastName;
    }

    getEmail(): UserEmail {
        return this.props.email;
    }

    getRole(): Role {
        return this.props.role;
    }

    getAssociationId(): AssociationId | null {
        return this.props.associationId;
    }

    updateFirstName(firstName: UserName): Result<void> {
        this.props.firstName = firstName;
        return Result.ok<void>();
    }

    updateLastName(lastName: UserName): Result<void> {
        this.props.lastName = lastName;
        return Result.ok<void>();
    }

    updateEmail(email: UserEmail): Result<void> {
        this.props.email = email;
        return Result.ok<void>();
    }

    updatePassword(password: UserPassword): Result<void> {
        this.props.password = password;
        return Result.ok<void>();
    }

    async comparePassword(plain: string): Promise<boolean> {
        return this.props.password.comparePassword(plain);
    }

    static create(props: UserCreationProps, id?: UniqueId): Result<User> {
        const checkedProps: UserProps = {
            ...props,
            role: props.role === undefined ? Role.DONATOR : props.role,
            associationId: props.associationId === undefined ? null : props.associationId
        };

        if(checkedProps.associationId === null && 
            (checkedProps.role === Role.VOLUNTEER || checkedProps.role === Role.MANAGER)){

            return Result.ko<User>("Volunteers and Managers must be affiliated to an association");
        }

        if(checkedProps.associationId !== null && 
            (checkedProps.role === Role.DONATOR || checkedProps.role === Role.ADMIN)){
            return Result.ko<User>("Donators and Admins cannot be affiliated to an association");
        }

        return Result.ok<User>(new User(checkedProps, id));
    }
}