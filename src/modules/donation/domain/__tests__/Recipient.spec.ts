import { UniqueId } from "../../../../core/domain";
import { Recipient } from "../Recipient";


describe("Recipient Entity", () => {
    describe("creation", () => {
        const uid = new UniqueId("a valid id");
        const props = { storeReference: "a valid store reference" };
        
        afterEach(() => {
            props.storeReference = "a valid store reference";
        })

        it("should return a new Recipient", () => {
            const recipientRes = Recipient.create(props, uid);
            expect(recipientRes.success).toBe(true);
            const recipient = recipientRes.getValue();
            expect(recipient.getId().toString()).toBe(uid.toString());
            expect(recipient.getStoreReference()).toBe(props.storeReference);
        })

        it("should fail when passing an empty store reference", () => {
            props.storeReference = "";
            const recipientRes = Recipient.create(props, uid);
            expect(recipientRes.success).toBe(false);
            expect(recipientRes.getValue()).toBe("Invalid store reference");
        })
    })
})