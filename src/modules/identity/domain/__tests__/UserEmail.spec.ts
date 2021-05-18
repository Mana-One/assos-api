import { IdentityErrors } from "../errors";
import { UserEmail } from "../UserEmail";

describe("UserEmail value object", () => {
    describe("creation", () => {
        it("should return a UserEmail object", () => {
            const emailOrError = UserEmail.create("username@yahoo.com");
            expect(emailOrError).toBeTruthy();
            if(emailOrError.isRight()){
                expect(emailOrError.value.getValue()).toBe("username@yahoo.com");
            } else {
                fail("Should be successful");
            }
        })

        it("should fail when passing an empty string", () => {
            const emailOrError = UserEmail.create("");
            expect(emailOrError).toBeTruthy();
            if(emailOrError.isLeft()){
                expect(emailOrError.value).toBe("Email is not compliant with RFC norm");
            } else {
                fail("Should not be successful");
            }
        })

        it("should fail when passing an invalid email", () => {
            const emailOrError = UserEmail.create(".username@yahoo.com");
            const emailOrError2 = UserEmail.create("username@yahoo.com.");
            const emailOrError3 = UserEmail.create("username@yahoo..com");
            const emailOrError4 = UserEmail.create("username@yahoo.c");
            const emailOrError5 = UserEmail.create("username@yahoo.corporate");
            if(emailOrError.isLeft() &&
                emailOrError2.isLeft() && 
                emailOrError3.isLeft() && 
                emailOrError4.isLeft() &&
                emailOrError5.isLeft()){

                expect(emailOrError.value).toBe("Email is not compliant with RFC norm");
                expect(emailOrError2.value).toBe("Email is not compliant with RFC norm");
                expect(emailOrError3.value).toBe("Email is not compliant with RFC norm");
                expect(emailOrError4.value).toBe("Email is not compliant with RFC norm");
                expect(emailOrError5.value).toBe("Email is not compliant with RFC norm");
            } else {
                fail("Should not be successful");
            }
        })
    })

    describe("equals", () => {
        it("should return false if comparing with null", () => {
            const emailOrError = UserEmail.create("username@yahoo.com");
            expect(emailOrError).toBeTruthy();
            if(emailOrError.isRight()){
                expect(emailOrError.value.getValue()).toBe("username@yahoo.com");
                const check = emailOrError.value.equals(null);
                expect(check).toBe(false);
            } else {
                fail("Should be successful");
            }
        })
    })
})