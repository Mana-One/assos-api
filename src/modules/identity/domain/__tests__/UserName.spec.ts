import { UserName } from "../UserName";

describe("UserName value object", () => {
    describe("creation", () => {
        it("should return a UserName object", () => {
            const res = UserName.create("name");
            expect(res.success).toBe(true);
            expect(res.getValue().getValue()).toBe("name");
        })

        it("should fail when passing an empty string", () => {
            const res = UserName.create("");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length for 'name'");
        })

        it("should fail when passing a name with more than 100 chars", () => {
            const res = UserName.create("azertyuiopqsdfghjklmwxcvbn".repeat(4));
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length for 'name'");
        })
    })

    describe("equals", () => {
        it("should return false if comparing with null", () => {
            const res = UserName.create("name");
            const check = res.getValue().equals(null);
            expect(check).toBe(false);
            
        })
    })
})