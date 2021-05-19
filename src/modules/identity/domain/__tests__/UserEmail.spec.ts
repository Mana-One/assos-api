import { UserEmail } from "../UserEmail";

describe("UserEmail value object", () => {
    describe("creation", () => {
        it("should return a UserEmail object", () => {
            const res = UserEmail.create("username@yahoo.com");
            expect(res.success).toBe(true);
            expect(res.getValue().getValue()).toBe("username@yahoo.com");
        })

        it("should fail when passing an empty string", () => {
            const res = UserEmail.create("");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Email is not compliant with RFC norm");
        })

        it("should fail when passing an invalid email", () => {
            const res = UserEmail.create(".username@yahoo.com");
            const res2 = UserEmail.create("username@yahoo.com.");
            const res3 = UserEmail.create("username@yahoo..com");
            const res4 = UserEmail.create("username@yahoo.c");
            const res5 = UserEmail.create("username@yahoo.corporate");

            expect(res.getValue()).toBe("Email is not compliant with RFC norm");
            expect(res2.getValue()).toBe("Email is not compliant with RFC norm");
            expect(res3.getValue()).toBe("Email is not compliant with RFC norm");
            expect(res4.getValue()).toBe("Email is not compliant with RFC norm");
            expect(res5.getValue()).toBe("Email is not compliant with RFC norm");
        })
    })

    describe("equals", () => {
        it("should return false if comparing with null", () => {
            const res = UserEmail.create("username@yahoo.com");
            const email = res.getValue();
            const check = email.equals(null);
            expect(check).toBe(false);
        })
    })
})