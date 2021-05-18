import { IdentityErrors } from "../errors";
import { UserEmail } from "../UserEmail";

describe("UserEmail value object", () => {
    describe("creation", () => {
        it("should return a UserEmail object", () => {
            const email = UserEmail.create("username@yahoo.com");
            expect(email).toBeTruthy();
            expect(email.value).toBe("username@yahoo.com");
        })

        it("should fail when passing an empty string", () => {
            expect(() => UserEmail.create("")).toThrow(IdentityErrors.InvalidEmail);
        })

        it("should fail when passing an invalid email", () => {
            expect(() => UserEmail.create(".username@yahoo.com")).toThrow(IdentityErrors.InvalidEmail);
            expect(() => UserEmail.create("username@yahoo.com.")).toThrow(IdentityErrors.InvalidEmail);
            expect(() => UserEmail.create("username@yahoo..com")).toThrow(IdentityErrors.InvalidEmail);
            expect(() => UserEmail.create("username@yahoo.c")).toThrow(IdentityErrors.InvalidEmail);
            expect(() => UserEmail.create("username@yahoo.corporate")).toThrow(IdentityErrors.InvalidEmail);
        })
    })
})