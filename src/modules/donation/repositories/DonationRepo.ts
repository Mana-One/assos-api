import { Amount, Donation } from "../domain";
import { RecurringDonation } from "../domain/RecurringDonation";


interface ListDonationsResponse {
    total: number;
    donations: Donation[]
}

export namespace DonationRepo {
    export interface ListByPayerId {
        (payerId: string, limit: number, offset: number): Promise<ListDonationsResponse>;
    }

    export interface FindRecurring {
        (payerId: string, recipientId: string): Promise<RecurringDonation | null>;
    }

    export interface RemoveRecurring {
        (recurringDonation: RecurringDonation): Promise<void>;
    }

    export interface Save {
        (donation: Donation): Promise<void>;
    }

    export interface SetUpRecurring {
        (payerId: string, recipientId: string, amount: Amount): Promise<void>;
    }
}