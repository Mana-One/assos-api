import { Card } from "../domain";

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
}