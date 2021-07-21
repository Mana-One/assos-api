import { Result, UseCaseError } from "../../../core/logic";

export namespace AdminErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: 'Account already exists'
            });
        }
    }

    export class AdminNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: 'Admin not found'
            });
        }
    }
}