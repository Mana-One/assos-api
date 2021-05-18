import { IdentityErrors } from "../errors";
import { User } from "../User";

describe("User entity", () => {
    describe("creation", () => {
        it("should return a new User when passing an undefined id", () => {
            const user = User.create({
                firstName: "Paolo",
                lastName: "Manaois",
                email: "username@yahoo.com",
                password: "azertyUIOP123$"
            });

            expect(user).toBeTruthy();
            expect(user.id.value).toBeTruthy();
            expect(user.firstName.value).toBe("Paolo");
            expect(user.lastName.value).toBe("Manaois");
            expect(user.email.value).toBe("username@yahoo.com");
            expect(user.password.isHashed).toBe(false);
            expect(user.password.value).toBe("azertyUIOP123$");
        })

        it("should fail when firstName is invalid", () => {
            expect(() => User.create({
                firstName: "",
                lastName: "Manaois",
                email: "username@yahoo.com",
                password: "azertyUIOP123$"
            })).toThrow(IdentityErrors.InvalidName);
        })

        it("should fail when lastName is invalid", () => {
            expect(() => User.create({
                firstName: "Paolo",
                lastName: "",
                email: "username@yahoo.com",
                password: "azertyUIOP123$"
            })).toThrow(IdentityErrors.InvalidName);
        })

        it("should fail when password is invalid", () => {
            expect(() => User.create({
                firstName: "Paolo",
                lastName: "Manaois",
                email: "username@yahoo.com",
                password: "azertyuiop123$"
            })).toThrow(IdentityErrors.InvalidPassword);
        })

        it("should fail when email is invalid", () => {
            expect(() => User.create({
                firstName: "Paolo",
                lastName: "Manaois",
                email: "username@yahoo..com",
                password: "azertyUIOP123$"
            })).toThrow(IdentityErrors.InvalidEmail);
        })
    })
})