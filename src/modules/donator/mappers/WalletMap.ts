import { Card, Wallet } from "../domain";
import { CardDto, CardMap } from "./CardMap";


export interface WalletDto {
    readonly cards: CardDto[];
}

export namespace WalletMap {
    export function toDto(wallet: Card[]){
        const cards = wallet.map(card => CardMap.toDto(card));
        return Object.freeze({ cards });
    }

    export function toDomain(raws: any[]): Wallet {
        const initialCards = raws.map(raw => CardMap.toDomain(raw));
        return new Wallet(initialCards);
    }
}