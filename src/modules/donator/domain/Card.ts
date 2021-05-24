import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { CardLast4 } from "./CardLast4";

interface CardProps {
    last4: CardLast4;
    storeReference: string;
}

export class Card extends Entity<CardProps> {
    getId(){
        return this._id;
    }

    getLast4(){
        return this.props.last4;
    }

    getStoreReference(){
        return this.props.storeReference;
    }

    static create(props: CardProps, id?: UniqueId): Result<Card> {
        const res = Guard.againstNullOrUndefined({ 
            key: "storeReference", 
            value: props.storeReference 
        });
        if(!res.success){
            return Result.ko<Card>(res.message);
        }

        if(props.storeReference.length === 0){
            return Result.ko<Card>("Invalid store reference value");
        }

        return Result.ok<Card>(new Card(props, id));
    }
}