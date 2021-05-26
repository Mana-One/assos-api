import { UniqueId } from "../../../../../core/domain";
import { Card, CardLast4 } from "../../../domain";

export const RetrieveByDonatorId = {
    empty: async function(donatorId: UniqueId): Promise<Card[]> {
        return [];
    },

    notEmpty: async function(donatorId: UniqueId): Promise<Card[]> {
        const props = {
            last4: CardLast4.create("1234").getValue(),
            storeReference: "a store reference"
        }
        const uid = new UniqueId("a valid id")
        return [Card.create(props, uid).getValue()];
    },

    throw: async function(donatorId: UniqueId): Promise<Card[]> {
        throw new Error("oopsie");
    }
}