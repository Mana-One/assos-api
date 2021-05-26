import { UniqueId } from "../../../../core/domain";
import { Card } from "../../domain";

export interface WalletRepo {
    retrieveByDonatorId(donatorId: UniqueId): Promise<Card[]>;
}