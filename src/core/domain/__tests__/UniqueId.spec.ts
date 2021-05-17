import { UniqueId } from "../UniqueId";

describe("UniqueId", () => {
    describe("creation", () => {
        it("should be truthy when passing undefined", () => {
            const uid = UniqueId.create();
            expect(uid.id).toBeTruthy();
        })
    
        it("should be truthy when passing a string", () => {
            const uid = UniqueId.create("an id");
            expect(uid.id).toBeTruthy();
        })
    })

    describe("areEqual", () => {
        it("should return true when the ids are the same", () => {
            const uid = UniqueId.create("an id");
            const check = UniqueId.areEqual(uid, uid);
            expect(check).toBe(true);
        })
    
        it("should return false when the ids are different", () => {
            const uid = UniqueId.create("an id");
            const uid2 = UniqueId.create("an id2");
            const check = UniqueId.areEqual(uid, uid2);
            expect(check).toBe(false);
        })
    })

})