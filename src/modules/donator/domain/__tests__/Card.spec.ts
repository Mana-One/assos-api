import { UniqueId } from "../../../../core/domain";
import { CardLast4 } from "../CardLast4";
import { Card } from "../Card";

describe("Card entity", () => {
    describe("creation", () => {
        const uid = new UniqueId("a valid id");
        const last4 = CardLast4.create("1234").getValue();
        let props;

        beforeEach(() => {
            props = {
                last4,
                storeReference: "a reference"
            };
        })

        it("should return a new Card when passing an undefined id", () => {
            const res = Card.create(props);
            expect(res.success).toBe(true);

            const card = res.getValue();
            expect(card instanceof Card).toBe(true);
            expect(card.getId()).toBeTruthy();
            expect(card.getLast4().equals(last4)).toBe(true);
            expect(card.getStoreReference()).toBe("a reference");
        })

        it("should return a new Card when passing a valid id", () => {
            const res = Card.create(props, uid);
            expect(res.success).toBe(true);

            const card = res.getValue();
            expect(card instanceof Card).toBe(true);
            expect(card.getId().equals(uid)).toBe(true);
            expect(card.getLast4().equals(last4)).toBe(true);
            expect(card.getStoreReference()).toBe("a reference");
        })

        it("should fail when passing an empty store reference", () => {
            props.storeReference = "";
            const res = Card.create(props, uid);
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid store reference value");
        })
    })
})