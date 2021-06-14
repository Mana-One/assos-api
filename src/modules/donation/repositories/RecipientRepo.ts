import { Recipient } from "../domain";


interface ListRecipientsResponse {
    total: number;
    recipients: Recipient[];
}

export namespace RecipientRepo {
    export interface FindById {
        (recipientId: string): Promise<Recipient | null>;
    }

    export interface ListByDonatorId {
        (donatorId: string): Promise<ListRecipientsResponse>;
    }
}