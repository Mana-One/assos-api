import { Result, UseCaseError } from "../../../core/logic";

export namespace IdentityErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(email: string){
            super(false, {
                message: `An account using ${email} already exists`
            });
        }
    }

    export class UserNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Could not find user"
            });
        }
    }

    export class NewAndCheckPasswordNotMatching extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Provided new and check password do not match"
            });
        }
    }
}