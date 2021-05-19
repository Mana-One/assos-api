import { IdentityErrors } from "../errors";
import { UserPassword } from "../UserPassword";

describe("UserPassword value object", () => {
    describe("creation", () => {
        it("should create a clear password", () => {
            const res = UserPassword.createNotHashed("azertyUIOP123$");
            expect(res.success).toBe(true);
            const password = res.getValue();
            expect(password.getValue()).toBe("azertyUIOP123$");
            expect(password.isAlreadyHashed()).toBe(false);
        })

        it("should create a hashed password", () => {
            const res = UserPassword.createHashed("azertyUIOP123$");
            expect(res.success).toBe(true);
            const password = res.getValue();
            expect(password.getValue()).toBe("azertyUIOP123$");
            expect(password.isAlreadyHashed()).toBe(true);
        })

        it("should fail if provided password is not hashed and does not have an uppercase char", () => {
            const res = UserPassword.createNotHashed("azertyuiop123$");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length or format for password");
        })

        it("should fail if provided password is not hashed and does not have a lowercase char", () => {
            const res = UserPassword.createNotHashed("AZERTYUIOP123$");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length or format for password");
        })

        it("should fail if provided password is not hashed and does not have a number", () => {
            const res = UserPassword.createNotHashed("azertyUIOP$");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length or format for password");
        })

        it("should fail if provided password is not hashed and does not have a special symbol", () => {
            const res = UserPassword.createNotHashed("azertyUIOP123");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length or format for password");
        })

        it("should fail if provided password is not hashed and is too short", () => {
            const res = UserPassword.createNotHashed("aZ1$");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length or format for password");
        })

        it("should fail if provided password is not hashed and is too long", () => {
            const res = UserPassword.createNotHashed("azertyUIOP123$".repeat(3));
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid length or format for password");
        })
    })

    describe("hashPassword", () => {
        it("should return a new password if passing a non-hashed UserPassword", async () => {
            const res = UserPassword.createNotHashed("azertyUIOP123$");
            const password = await res.getValue().hashPassword();
            expect(password).not.toBe("azertyUIOP123$");
        })

        it("should return the same value if the passed UserPassword is already hashed", async () => {
            const res = UserPassword.createHashed("azertyUIOP123$");
            const password = await res.getValue().hashPassword();
            expect(password).toBe("azertyUIOP123$");
        })
    })

    describe("comparePassword", () => {
        it("should succeed when clearPassword matches UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$";
            const res = UserPassword.createHashed("$2a$10$rVr4z.ZT6KUOgZWzJIaqQurwc7gORCtwSQJrcuXJ3.sdRqLYVPWhO");
            const check = await res.getValue().comparePassword(clear);
            expect(check).toBe(true);
        })

        it("should succeed when clearPassword matches UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$";
            const res = UserPassword.createNotHashed(clear);
            const check = await res.getValue().comparePassword(clear);
            expect(check).toBe(true);
        })

        it("should fail when clearPassword does not match UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const res = UserPassword.createHashed("$2a$10$rVr4z.ZT6KUOgZWzJIaqQurwc7gORCtwSQJrcuXJ3.sdRqLYVPWhO");
            const check = await res.getValue().comparePassword(clear);
            expect(check).toBe(false);
        })

        it("should fail when clearPassword does not match UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const res = UserPassword.createNotHashed("azertyUIOP123$");
            const check = await res.getValue().comparePassword(clear);
            expect(check).toBe(false);
        })
    })
})