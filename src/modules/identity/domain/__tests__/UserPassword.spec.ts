import { IdentityErrors } from "../errors";
import { UserPassword } from "../UserPassword";

describe("UserPassword value object", () => {
    describe("creation", () => {
        it("should create a clear password", () => {
            const passwordOrError = UserPassword.createNotHashed("azertyUIOP123$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isRight()){
                const password = passwordOrError.value.getValue();
                const isHashed = passwordOrError.value.isAlreadyHashed();
                expect(password).toBe("azertyUIOP123$");
                expect(isHashed).toBe(false);
            } else {
                fail("Should be successful");
            }
        })

        it("should create a hashed password", () => {
            const passwordOrError = UserPassword.createHashed("azertyUIOP123$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isRight()){
                const password = passwordOrError.value.getValue();
                const isHashed = passwordOrError.value.isAlreadyHashed();
                expect(password).toBe("azertyUIOP123$");
                expect(isHashed).toBe(true);
            } else {
                fail("Should be successful");
            }
        })

        it("should fail if provided password is not hashed and does not have an uppercase char", () => {
            const passwordOrError = UserPassword.createNotHashed("azertyuiop123$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isLeft()){
                const error = passwordOrError.value;
                expect(error).toBe("Invalid length or format for password");
            } else {
                fail("Should not be successful");
            }
        })

        it("should fail if provided password is not hashed and does not have a lowercase char", () => {
            const passwordOrError = UserPassword.createNotHashed("AZERTYUIOP123$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isLeft()){
                const error = passwordOrError.value;
                expect(error).toBe("Invalid length or format for password");
            } else {
                fail("Should not be successful");
            }
        })

        it("should fail if provided password is not hashed and does not have a number", () => {
            const passwordOrError = UserPassword.createNotHashed("azertyUIOP$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isLeft()){
                const error = passwordOrError.value;
                expect(error).toBe("Invalid length or format for password");
            } else {
                fail("Should not be successful");
            }
        })

        it("should fail if provided password is not hashed and does not have a special symbol", () => {
            const passwordOrError = UserPassword.createNotHashed("azertyUIOP123");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isLeft()){
                const error = passwordOrError.value;
                expect(error).toBe("Invalid length or format for password");
            } else {
                fail("Should not be successful");
            }
        })

        it("should fail if provided password is not hashed and is too short", () => {
            const passwordOrError = UserPassword.createNotHashed("aZ1$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isLeft()){
                const error = passwordOrError.value;
                expect(error).toBe("Invalid length or format for password");
            } else {
                fail("Should not be successful");
            }
        })

        it("should fail if provided password is not hashed and is too long", () => {
            const passwordOrError = UserPassword.createNotHashed("azertyUIOP123$".repeat(3));
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isLeft()){
                const error = passwordOrError.value;
                expect(error).toBe("Invalid length or format for password");
            } else {
                fail("Should not be successful");
            }
        })
    })

    describe("hashPassword", () => {
        it("should return a new password if passing a non-hashed UserPassword", async () => {
            const passwordOrError = UserPassword.createNotHashed("azertyUIOP123$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isRight()){
                const password = await passwordOrError.value.hashPassword();
                expect(password).toBeTruthy();
                expect(password).not.toBe("azertyUIOP123$");
            } else {
                fail("Should be successful");
            }
        })

        it("should return the same value if the passed UserPassword is already hashed", async () => {
            const passwordOrError = UserPassword.createHashed("azertyUIOP123$");
            expect(passwordOrError).toBeTruthy();
            if(passwordOrError.isRight()){
                const password = await passwordOrError.value.hashPassword();
                expect(password).toBe("azertyUIOP123$");
            } else {
                fail("Should be successful");
            }
        })
    })

    describe("comparePassword", () => {
        it("should succeed when clearPassword matches UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$";
            const passwordOrError = UserPassword.createHashed("$2a$10$rVr4z.ZT6KUOgZWzJIaqQurwc7gORCtwSQJrcuXJ3.sdRqLYVPWhO");
            if(passwordOrError.isRight()){
                const check = await passwordOrError.value.comparePassword(clear);
                expect(check).toBe(true);
            } else {
                fail("Should be successful");
            }
        })

        it("should succeed when clearPassword matches UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$";
            const passwordOrError = UserPassword.createNotHashed(clear);
            if(passwordOrError.isRight()){
                const check = await passwordOrError.value.comparePassword(clear);
                expect(check).toBe(true);
            } else {
                fail("Should be successful");
            }
        })

        it("should fail when clearPassword does not match UserPassword with hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const passwordOrError = UserPassword.createHashed("$2a$10$rVr4z.ZT6KUOgZWzJIaqQurwc7gORCtwSQJrcuXJ3.sdRqLYVPWhO");
            if(passwordOrError.isRight()){
                const check = await passwordOrError.value.comparePassword(clear);
                expect(check).toBe(false);
            } else {
                fail("Should be successful");
            }
        })

        it("should fail when clearPassword does not match UserPassword with non-hashed value", async () => {
            const clear = "azertyUIOP123$hey";
            const passwordOrError = UserPassword.createNotHashed("azertyUIOP123$");
            if(passwordOrError.isRight()){
                const check = await passwordOrError.value.comparePassword(clear);
                expect(check).toBe(false);
            } else {
                fail("Should be successful");
            }
        })
    })
})