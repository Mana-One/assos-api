import { UniqueId } from "../../../../core/domain";
import { Card } from "../../domain";

export interface WalletRepo {
    findCardById(cardId: string): Promise<Card | null>;
    retrieveByDonatorId(donatorId: UniqueId): Promise<Card[]>;
}