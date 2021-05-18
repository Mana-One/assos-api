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
        it("should return true if the names are the same object", () => {
            const userNameOrError = UserName.create("name");
            if(userNameOrError.isRight()){
                const userName = userNameOrError.value;
                const check = userName.equals(userName);
                expect(check).toBe(true);
            } else {
                fail("Should be successful");
            }
        })

        it("should return true if the names have the same values", () => {
            const userNameOrError = UserName.create("name");
            const userNameOrError2 = UserName.create("name");
            if(userNameOrError.isRight() && userNameOrError2.isRight()){
                const userName = userNameOrError.value;
                const userName2 = userNameOrError2.value;
                const check = userName.equals(userName2);
                expect(check).toBe(true);
            } else {
                fail("Should be successful when creating names");
            }
        })

        it("should return false if the names have different values", () => {
            const userNameOrError = UserName.create("name");
            const userNameOrError2 = UserName.create("name2");
            if(userNameOrError.isRight() && userNameOrError2.isRight()){
                const userName = userNameOrError.value;
                const userName2 = userNameOrError2.value;
                const check = userName.equals(userName2);
                expect(check).toBe(false);
            } else {
                fail("Should be successful when creating names");
            }
        })

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

        it("should return false if comparing with undefined", () => {
            const userNameOrError = UserName.create("name");
            if(userNameOrError.isRight()){
                const userName = userNameOrError.value;
                const check = userName.equals(undefined);
                expect(check).toBe(false);
            } else {
                fail("Should be successful when creating name");
            }
        })
    })
})