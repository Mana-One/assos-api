import { Card } from "../domain";
import { CardDto, CardMap } from "./CardMap";


export interface WalletDto {
    readonly cards: CardDto[];
}

export namespace WalletMap {
    export function toDto(wallet: Card[]) {
        const cards = wallet.map(card => CardMap.toDto(card));
        return Object.freeze({ cards });
    }
}