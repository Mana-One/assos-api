import { Result, UseCaseError } from "../../../core/logic";

export namespace DonatorErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Account already exists"
            });
        }
    }

    export class DonatorNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Not found"
            });
        }
    }

    export class WalletIsFull extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Wallet is at max capacity"
            });
        }
    }
}