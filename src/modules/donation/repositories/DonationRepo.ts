import { Donation } from "../domain";


interface ListDonationsResponse {
    total: number;
    donations: Donation[]
}

export namespace DonationRepo {
    export interface ListByDonatorId {
        (donatorId: string): Promise<ListDonationsResponse>;
    }

    export interface Save {
        (donation: Donation): Promise<void>;
    }
}