import { Result, UseCaseError } from "../../../core/logic";

export namespace AdminErrors {
    export class AdminNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: 'Admin not found'
            });
        }
    }
}