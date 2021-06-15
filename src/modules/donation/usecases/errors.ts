import { Result, UseCaseError } from "../../../core/logic";


export namespace DonationErrors {
    export class RecipientNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Recipient for donation not found"
            });
        }
    }

    export class PayerNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Payer for donation not found"
            });
        }
    }
}