import { IdentityErrors } from "../errors";
import { UserName } from "../UserName";

describe("UserName value object", () => {
    describe("creation", () => {
        it("should return a UserName object", () => {
            const userName = UserName.create("name");
            expect(userName).toBeTruthy();
            expect(userName.value).toBe("name");
        })

        it("should fail when passing an empty string", () => {
            expect(() => UserName.create("")).toThrow(IdentityErrors.InvalidName);
        })

        it("should fail when passing a name with more than 100 chars", () => {
            const name = "azertyuiopqsdfghjklmwxcvbn".repeat(4);
            expect(() => UserName.create(name)).toThrow(IdentityErrors.InvalidName);
        })
    })
})