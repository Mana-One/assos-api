import { Amount, Donation } from "../domain";
import { RecurringDonation } from "../domain/RecurringDonation";


export interface ListDonationsResponse {
    total: number;
    donations: Donation[]
}

export interface ListRecurringResponse {
    total: number;
    recurringDonations: RecurringDonation[];
}

export namespace DonationRepo {
    export interface ListByPayerId {
        (payerId: string, limit: number, offset: number): Promise<ListDonationsResponse>;
    }

    export interface ListRecurringByPayerId {
        (payerId: string, limit: number, offset: number): Promise<ListRecurringResponse>;
    }

    export interface ListByRecipientId {
        (recipientId: string, limit: number, offset: number): Promise<ListDonationsResponse>;
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
        (payerId: string, recipientId: string, amount: Amount, storeReference: string): Promise<void>;
    }
}