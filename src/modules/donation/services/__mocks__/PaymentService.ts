import { Amount, Payer, Recipient } from "../../domain";


export const CreateRecurringPayment = {
    ok: async (payer: Payer, recipient: Recipient, amount: Amount) => {},
    throw: (payer: Payer, recipient: Recipient, amount: Amount) => { throw new Error("oopsie"); }
}