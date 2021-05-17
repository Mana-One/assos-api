import { hash } from "bcryptjs";
import { IdentityErrors } from "../errors";
import { UserPassword } from "../UserPassword";

describe("UserPassword value object", () => {
    describe("creation", () => {
        it("should create a clear password", () => {
            const password = UserPassword.create({
                password: "azertyUIOP123$",
                isHashed: false
            });
            expect(password).toBeTruthy();
            expect(password.isHashed).toBe(false);
            expect(password.password).toBe("azertyUIOP123$");
        })

        it("should create a hashed password", () => {
            const password = UserPassword.create({
                password: "a hashed password",
                isHashed: true
            });
            expect(password).toBeTruthy();
            expect(password.isHashed).toBe(true);
            expect(password.password).toBe("a hashed password");
        })

        it("should fail if provided password is not hashed and does not have an uppercase char", () => {
            expect(() => UserPassword.create({ 
                password: "azertyuiop123$",
                isHashed: false 
            })).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and does not have a lowercase char", () => {
            expect(() => UserPassword.create({ 
                password: "AZERTYUIOP123$",
                isHashed: false 
            })).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and does not have a number", () => {
            expect(() => UserPassword.create({ 
                password: "azertyUIOP$",
                isHashed: false 
            })).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and does not have a special symbol", () => {
            expect(() => UserPassword.create({ 
                password: "azertyUIOP123",
                isHashed: false 
            })).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and is too short", () => {
            expect(() => UserPassword.create({ 
                password: "aZ1$",
                isHashed: false 
            })).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail if provided password is not hashed and is too long", () => {
            expect(() => UserPassword.create({ 
                password: "azertyUIOP123$".repeat(3),
                isHashed: false 
            })).toThrow(IdentityErrors.InvalidPassword);
        })
    })

    describe("hash", () => {
        it("should return a new password value object if passing a non-hashed UserPassword", async () => {
            const password = UserPassword.create({
                password: "azertyUIOP123$",
                isHashed: false
            });
            const hashed = await UserPassword.hash(password);

            expect(hashed).toBeTruthy();
            expect(hashed.isHashed).toBe(true);
            expect(hashed.password).toBeTruthy();
        })

        it("should return the same value object if the passed UserPassword is already hashed", async () => {
            const password = UserPassword.create({
                password: "azertyUIOP123$",
                isHashed: true
            });
            const hashed = await UserPassword.hash(password);
            expect(hashed === password).toBe(true);
            expect(hashed).toEqual(password);
        })
    })

    describe("compare", () => {
        it("should succeed when clearPassword matches UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$";
            const hashed = await UserPassword.hash(UserPassword.create({
                password: "azertyUIOP123$",
                isHashed: false
            }));

            const check = await UserPassword.compare(clear, hashed);
            expect(check).toBe(true);
        })

        it("should succeed when clearPassword matches UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$";
            const notHashed = UserPassword.create({
                password: "azertyUIOP123$",
                isHashed: false
            });

            const check = await UserPassword.compare(clear, notHashed);
            expect(check).toBe(true);
        })

        it("should fail when clearPassword does not match UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const notHashed = UserPassword.create({
                password: "azertyUIOP123$",
                isHashed: false
            });

            const check = await UserPassword.compare(clear, notHashed);
            expect(check).toBe(false);
        })

        it("should fail when clearPassword does not match UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const hashed = await UserPassword.hash(UserPassword.create({
                password: "azertyUIOP123$",
                isHashed: false
            }));

            const check = await UserPassword.compare(clear, hashed);
            expect(check).toBe(false);
        })
    })
})