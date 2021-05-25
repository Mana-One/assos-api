import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { UserEmail, UserName, UserPassword } from "../../../shared/domain";
import { Card } from "./Card";
import { StoreReference } from "./StoreReference";
import { Wallet } from "./Wallet";

interface DonatorProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
    storeReference: StoreReference;
    wallet: Wallet;
}

export class Donator extends Entity<DonatorProps> {
    private static WALLET_CAPACITY = 5;

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

    getStoreReference(): StoreReference {
        return this.props.storeReference;
    }

    getWallet() {
        return this.props.wallet.getItems();
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