import { Amount, Payer, Recipient, StoreReference } from "../domain";

export namespace PaymentService {
    export interface CancelRecurringPayment {
        (recurringDonationStoreReference: StoreReference): Promise<void>;
    }

    export interface CreateRecurringPayment {
        (
            payer: Payer, 
            recipient: Recipient, 
            amount: Amount
        ): Promise<void>;
    }
}