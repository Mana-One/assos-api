import { Amount, Donation } from "../../domain";

export const Save = {
    ok: async (donation: Donation) => {},
    throw: async (donation: Donation) => { throw new Error("oopsie"); }
}

export const SetUpRecurring = {
    ok: async (payerId: string, recipientId: string, amount: Amount) => {},
    throw: async (payerId: string, recipientId: string, amount: Amount) => { throw new Error("oopsie"); }
}