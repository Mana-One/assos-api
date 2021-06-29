import { Entity, UniqueId } from "../../../core/domain";
import { Result } from "../../../core/logic";
import { UserName, UserEmail, UserPassword, Role } from "../../../shared/domain";


interface MemberProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
    role: Role;
    associationId: UniqueId;
}

export class Member extends Entity<MemberProps> {
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

    getAssociationId(): UniqueId {
        return this.props.associationId;
    }

    static create(props: MemberProps, id?: UniqueId): Result<Member> {
        if(props.role !== Role.MANAGER && props.role !== Role.VOLUNTEER){
            return Result.ko<Member>("Invalid role");
        }

        return Result.ok<Member>(new Member(props, id));
    }
}