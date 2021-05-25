import { Result, UseCaseError } from "../../../core/logic";

export namespace DonatorErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Account already exists"
            });
        }
    }
}