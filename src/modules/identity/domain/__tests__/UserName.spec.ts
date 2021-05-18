import { UserName } from "../UserName";

describe("UserName value object", () => {
    describe("creation", () => {
        it("should return a UserName object", () => {
            const userName = UserName.create("name");
            expect(userName).toBeTruthy();
            if(userName.isRight()){
                expect(userName.value.getValue()).toBe("name");
            } else {
                fail("Should be successful")
            }
        })

        it("should fail when passing an empty string", () => {
            const userName = UserName.create("");
            expect(userName).toBeTruthy();
            if(userName.isLeft()){
                expect(userName.value).toBe("Invalid length for 'name'");
            } else {
                fail("Should not be successful");
            }
        })

        it("should fail when passing a name with more than 100 chars", () => {
            const userName = UserName.create("azertyuiopqsdfghjklmwxcvbn".repeat(4));
            expect(userName).toBeTruthy();
            if(userName.isLeft()){
                expect(userName.value).toBe("Invalid length for 'name'");
            } else {
                fail("Should not be successful");
            }
        })
    })

    describe("equals", () => {
        it("should return false if comparing with null", () => {
            const userNameOrError = UserName.create("name");
            if(userNameOrError.isRight()){
                const userName = userNameOrError.value;
                const check = userName.equals(null);
                expect(check).toBe(false);
            } else {
                fail("Should be successful when creating name");
            }
        })
    })
})