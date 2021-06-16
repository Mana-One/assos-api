import { Amount, Payer, Recipient, StoreReference } from "../../domain";


export const CancelRecurringPayment = {
    ok: async (recurringDonationStoreReference: StoreReference) => {},
    throw: async (recurringDonationStoreReference: StoreReference) => { throw new Error("oopise"); }
}

export const CreateRecurringPayment = {
    ok: async (payer: Payer, recipient: Recipient, amount: Amount) => {},
    throw: (payer: Payer, recipient: Recipient, amount: Amount) => { throw new Error("oopsie"); }
}