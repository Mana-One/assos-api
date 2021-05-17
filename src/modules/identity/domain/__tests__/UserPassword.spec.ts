import { IdentityErrors } from "../errors";
import { UserPassword } from "../UserPassword";

describe("UserPassword value object", () => {
    describe("creation", () => {
        it("should create a clear password", () => {
            const password = UserPassword.create("azertyUIOP123$");
            expect(password).toBeTruthy();
            expect(password.isHashed).toBe(false);
            expect(password.value).toBe("azertyUIOP123$");
        })

        it("should create a hashed password", () => {
            const password = UserPassword.create(
                "a hashed password",
                true
            );
            expect(password).toBeTruthy();
            expect(password.isHashed).toBe(true);
            expect(password.value).toBe("a hashed password");
        })

        it("should fail if provided password is not hashed and does not have an uppercase char", () => {
            expect(() => UserPassword.create("azertyuiop123$")).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and does not have a lowercase char", () => {
            expect(() => UserPassword.create("AZERTYUIOP123$")).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and does not have a number", () => {
            expect(() => UserPassword.create("azertyUIOP$")).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and does not have a special symbol", () => {
            expect(() => UserPassword.create("azertyUIOP123")).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and is too short", () => {
            expect(() => UserPassword.create("aZ1$")).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and is too long", () => {
            expect(() => UserPassword.create("azertyUIOP123$".repeat(3))).toThrow(IdentityErrors.InvalidPassword);
        })
    })

    describe("hash", () => {
        it("should return a new password value object if passing a non-hashed UserPassword", async () => {
            const password = UserPassword.create("azertyUIOP123$");
            const hashed = await UserPassword.hash(password);
            expect(hashed).toBeTruthy();
            expect(hashed.isHashed).toBe(true);
            expect(hashed.value).toBeTruthy();
        })

        it("should return the same value object if the passed UserPassword is already hashed", async () => {
            const password = UserPassword.create(
                "azertyUIOP123$",
                true
            );
            const hashed = await UserPassword.hash(password);
            expect(hashed === password).toBe(true);
            expect(hashed).toEqual(password);
        })
    })

    describe("compare", () => {
        it("should succeed when clearPassword matches UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$";
            const hashed = await UserPassword.hash(UserPassword.create("azertyUIOP123$"));

            const check = await UserPassword.compare(clear, hashed);
            expect(check).toBe(true);
        })

        it("should succeed when clearPassword matches UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$";
            const notHashed = UserPassword.create("azertyUIOP123$");

            const check = await UserPassword.compare(clear, notHashed);
            expect(check).toBe(true);
        })

        it("should fail when clearPassword does not match UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const notHashed = UserPassword.create("azertyUIOP123$");

            const check = await UserPassword.compare(clear, notHashed);
            expect(check).toBe(false);
        })

        it("should fail when clearPassword does not match UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const hashed = await UserPassword.hash(UserPassword.create("azertyUIOP123$"));

            const check = await UserPassword.compare(clear, hashed);
            expect(check).toBe(false);
        })
    })
})