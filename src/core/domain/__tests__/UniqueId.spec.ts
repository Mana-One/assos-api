import { UniqueId } from "../UniqueId";

describe("UniqueId", () => {
    describe("creation", () => {
        it("should be truthy when passing undefined", () => {
            const uid = new UniqueId();
            expect(uid.value).toBeTruthy();
        })
    
        it("should be truthy when passing a string", () => {
            const uid = new UniqueId("an id");
            expect(uid.value).toBe("an id");
        })
    })

    describe("equals", () => {
        it("should return true when the ids are the same object", () => {
            const uid = new UniqueId("an id");
            const check = uid.equals(uid);
            expect(check).toBe(true);
        })

        it("should return true when the ids have the same value", () => {
            const uid = new UniqueId("an id");
            const uid2 = new UniqueId("an id");
            const check = uid.equals(uid2);
            expect(check).toBe(true);
        })
    
        it("should return false when the ids are of the same type but different values", () => {
            const uid = new UniqueId("an id");
            const uid2 = new UniqueId("an id2");
            const check = uid.equals(uid2);
            expect(check).toBe(false);
        })

        it("should return false when the ids are of different types", () => {
            const uid = new UniqueId("1");
            const uid2 = new UniqueId(1);
            const check = uid.equals(uid2);
            expect(check).toBe(false);
        })
    })

})