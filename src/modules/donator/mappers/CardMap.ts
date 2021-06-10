import { UniqueId } from "../../../core/domain";
import { Card, CardLast4 } from "../domain";

export interface CardDto {
    readonly id: string;
    readonly last4: string;
    readonly storeReference: string;
}

export namespace CardMap {
    export function toDto(card: Card){
        return Object.freeze({
            id: card.getId().toString(),
            last4: card.getLast4().getValue(),
            storeReference: card.getStoreReference()
        });
    }

    export function toDomain(raw: any){
        const uid = new UniqueId(raw.id);
        const last4 = CardLast4.create(raw.last4).getValue();
        const storeReference = raw.storeReference;

        return Card.create({ 
            last4, 
            storeReference }, 
        uid).getValue();
    }

    export function toPersistence(card: Card, donatorId: string){
        return Object.freeze({
            id: card.getId().toString(),
            last4: card.getLast4().getValue(),
            storeReference: card.getStoreReference(),
            donatorId
        });
    }
}