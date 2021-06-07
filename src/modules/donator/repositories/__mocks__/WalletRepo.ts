import { UniqueId } from "../../../../core/domain";
import { Card, CardLast4 } from "../../domain";


const uid = new UniqueId("a valid id");
const props = {
    last4: CardLast4.create("1234").getValue(),
    storeReference: "a store reference"
}

export const RetrieveByDonatorId = {
    empty: async function(donatorId: string): Promise<Card[]> {
        return [];
    },

    notEmpty: async function(donatorId: string): Promise<Card[]> {        
        return [Card.create(props, uid).getValue()];
    },

    throw: async function(donatorId: string): Promise<Card[]> {
        throw new Error("oopsie");
    }
}

export const FindCardById = {
    notNull: async function(cardId: string): Promise<Card | null> {
        return Card.create(props, new UniqueId(cardId)).getValue();
    },

    null: async function(cardId: string): Promise<Card | null> {
        return null;
    },

    throw: async function(cardId: string): Promise<Card | null> {
        throw new Error("oopsie");
    }
}