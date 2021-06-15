import { UniqueId } from "../../../../core/domain";
import { Payer } from "../Payer";


describe("Payer Entity", () => {
    describe("creation", () => {
        const uid = new UniqueId("a valid id");
        const props = { storeReference: "a valid store reference" };

        it("should return a Payer instance", () => {
            const payerRes = Payer.create(props, uid);
            expect(payerRes.success).toBe(true);
            const payer = payerRes.getValue();
            expect(payer instanceof Payer).toBe(true);
            expect(payer.getId().equals(uid)).toBe(true);
            expect(payer.getStoreReference()).toBe(props.storeReference);
        })

        it("should fail when passing an invalid store reference", () => {
            const payerRes = Payer.create({ storeReference: "" }, uid);
            expect(payerRes.success).toBe(false);
            expect(payerRes.getValue()).toBe("Invalid store reference");
        })
    })
})