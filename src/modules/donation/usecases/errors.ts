import { Result, UseCaseError } from "../../../core/logic";


export namespace DonationErrors {
    export class RecipientNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Recipient for donation not found"
            });
        }
    }
}