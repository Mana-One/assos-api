import { Amount, Donation } from "../domain";


interface ListDonationsResponse {
    total: number;
    donations: Donation[]
}

export namespace DonationRepo {
    export interface ListByDonatorId {
        (payerId: string): Promise<ListDonationsResponse>;
    }

    export interface Save {
        (donation: Donation): Promise<void>;
    }

    export interface SetUpRecurring {
        (payerId: string, recipientId: string, amount: Amount): Promise<void>;
    }
}