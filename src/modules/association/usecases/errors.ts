import { Result, UseCaseError } from "../../../core/logic";


export namespace AssociationErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Account already exists"
            });
        }
    }
}