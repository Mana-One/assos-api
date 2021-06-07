import { Card } from "../domain";

export namespace WalletRepo {
    export interface FindCardById {
        (cardId: string): Promise<Card | null>;
    }
    
    export interface RetrieveByDonatorId {
        (donatorId: string): Promise<Card[]>;
    }
}