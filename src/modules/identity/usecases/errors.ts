import { Result, UseCaseError } from "../../../core/logic";

export namespace IdentityErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(email: string){
            super(false, {
                message: `An account using ${email} already exists`
            });
        }
    }
}