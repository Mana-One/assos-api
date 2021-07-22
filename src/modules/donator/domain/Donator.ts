import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { UserEmail, UserName, UserPassword } from "../../../shared/domain";
import { StoreReference } from "./StoreReference";

interface DonatorProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
    storeReference: StoreReference;
}

export class Donator extends Entity<DonatorProps> {
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

    getStoreReference(): StoreReference {
        return this.props.storeReference;
    }

    static create(props: DonatorProps, id?: UniqueId): Result<Donator> {
        const guardResult = Guard.againstNullOrUndefined({
            key: "storeReference",
            value: props.storeReference
        });
        if(!guardResult.success){
            return Result.ko<Donator>(guardResult.message);
        }

        if(props.storeReference.length === 0){
            return Result.ko<Donator>("Invalid store reference");
        }

        return Result.ok<Donator>(new Donator(props, id));
    }
}