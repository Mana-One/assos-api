import { Recipient } from "../domain";


export namespace RecipientRepo {
    export interface FindById {
        (recipientId: string): Promise<Recipient | null>;
    }
}