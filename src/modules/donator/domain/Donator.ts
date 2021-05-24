import { Entity, UniqueId } from "../../../core/domain";
import { Result } from "../../../core/logic";
import { UserEmail, UserName, UserPassword } from "../../../shared/domain";
import { Card } from "./Card";
import { Wallet } from "./Wallet";

interface DonatorProps {
    firstName: UserName;
    lastName: UserName;
    email: UserEmail;
    password: UserPassword;
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

    getWallet() {
        return this.props.wallet.getItems();
    }

    static create(props: DonatorProps, id?: UniqueId): Result<Donator> {
        return Result.ok<Donator>(new Donator(props, id));
    }
}