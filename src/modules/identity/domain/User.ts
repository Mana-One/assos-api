import { Entity, UniqueId } from "../../../core/domain";
import { Either, Guard, left, Result, right } from "../../../core/logic";
import { Role } from "./Role";
import { UserEmail } from "./UserEmail";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

interface UserProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
    role: Role
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

    static create(props: UserProps, id?: UniqueId): Result<User> {
        return Result.ok<User>(new User(props, id));
    }
}