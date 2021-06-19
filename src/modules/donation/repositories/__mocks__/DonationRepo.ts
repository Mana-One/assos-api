import { UniqueId } from "../../../../core/domain";
import { Amount, Donation, DonationType, Recipient } from "../../domain";
import { RecurringDonation } from "../../domain/RecurringDonation";


export const FindRecurring = {
    null: async (pi: string, ri: string) => null,
    notNull: async (pi: string, ri: string) => RecurringDonation.create(
        new UniqueId(pi),
        Recipient.create({ 
            name: "a recipient",
            storeReference: "a valid store reference" 
        }, new UniqueId()).getValue(),
        Amount.create(50.50, "eur").getValue(),
        "a valid store reference"
    ).getValue(),
    throw: async (pi: string, ri: string) => { throw new Error("oopsie"); }
}

export const ListByPayerId = {
    ok: async (pi: string, limit: number, offset: number) => {
        const uid = new UniqueId("a donation id");
        const amount = Amount.create(500.50, "eur").getValue();
        const props = {
            amount,
            date: new Date(),
            type: DonationType.SINGLE,
            payerId: new UniqueId("a donator id"),
            recipient: Recipient.create({ 
                name: "a recipient",
                storeReference: "a store reference" 
            }, new UniqueId("a recipient id")).getValue()
        }
        
        return {
            total: 1,
            donations: [Donation.create(props, uid).getValue()]
        };
    },
    throw: async (pi: string) => { throw new Error("oopsie"); }
}

export const ListRecurringByPayerId = {
    ok: async (pi: string, limit: number, offset: number) => {
        const amount = Amount.create(500.50, "eur").getValue();
        const recipient =Recipient.create({ 
            name: "a recipient",
            storeReference: "a store reference" 
        }, new UniqueId("a recipient id")).getValue();

        return {
            total: 1,
            recurringDonations: [RecurringDonation.create(
                new UniqueId("a payer id"),
                recipient,
                amount,
                "a recurring donation store reference",
                new Date("2020-5-3")
            ).getValue()]
        };
    },
    throw: async (pi: string, limit: number, offset: number) => { throw new Error("oopsie"); }
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