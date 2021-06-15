import { Amount, Payer, Recipient } from "../domain";

export namespace PaymentService {
    export interface CreateRecurringPayment {
        (
            payer: Payer, 
            recipient: Recipient, 
            amount: Amount
        ): Promise<void>;
    }
}