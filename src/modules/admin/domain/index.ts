import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { UserEmail, UserName, UserPassword } from "../../../shared/domain";


interface AdminProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
}

export class Admin extends Entity<AdminProps> {
    getId(){
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

    async getHashedPassword(): Promise<string> {
        return this.props.password.hashPassword();
    }

    static create(props: AdminProps, id?: UniqueId): Result<Admin> {
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'firstName', value: props.firstName },
            { key: 'lastName', value: props.lastName },
            { key: 'email', value: props.email },
            { key: 'password', value: props.password }
        ]);
        if(!guard.success){
            return Result.ko<Admin>(guard.message);
        }

        return Result.ok<Admin>(new Admin(props, id));
    }
}