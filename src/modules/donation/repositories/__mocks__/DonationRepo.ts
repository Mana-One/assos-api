import { UniqueId } from "../../../../core/domain";
import { Amount, Donation } from "../../domain";
import { RecurringDonation } from "../../domain/RecurringDonation";


export const FindRecurring = {
    null: async (pi: string, ri: string) => null,
    notNull: async (pi: string, ri: string) => RecurringDonation.create(
        new UniqueId(pi),
        new UniqueId(ri),
        Amount.create(50.50, "eur").getValue(),
        "a valid store reference"
    ).getValue(),
    throw: async (pi: string, ri: string) => { throw new Error("oopsie"); }
}

export const RemoveRecurring = {
    ok: async (rd: RecurringDonation) => {},
    throw: async (rd: RecurringDonation) => { throw new Error(); }
}

export const Save = {
    ok: async (donation: Donation) => {},
    throw: async (donation: Donation) => { throw new Error("oopsie"); }
}

export const SetUpRecurring = {
    ok: async (payerId: string, recipientId: string, amount: Amount) => {},
    throw: async (payerId: string, recipientId: string, amount: Amount) => { throw new Error("oopsie"); }
}