import { WatchedList } from "../../../core/domain";
import { Card } from "./Card";

export class Wallet extends WatchedList<Card> {
    constructor(initialCards?: Card[]){
        super(initialCards);
    }

    compareItems(a: Card, b: Card): boolean {
        return a.equals(b);
    }    
}