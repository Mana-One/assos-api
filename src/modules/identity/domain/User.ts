import { Entity, UniqueId } from "../../../core/domain";
import { Result } from "../../../core/logic";
import { Role } from "../../../shared/domain";
import { UserEmail, UserName, UserPassword } from "../../../shared/domain";

interface UserProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
    role: Role;
    associationId: UniqueId | null;
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

    async getHashedPassword() {
        return this.props.password.hashPassword();
    }

    getRole(): Role {
        return this.props.role;
    }

    getAssociationId(): UniqueId | null {
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

    static create(props: UserProps, id?: UniqueId): Result<User> {
        return Result.ok<User>(new User(props, id));
    }
}