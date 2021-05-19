import { Role, RoleName } from "../Role";

describe("Role entity", () => {
    describe("creation", () => {
        it("should return a new role when passing a valid role name", () => {
            const roleOrError = Role.create("donator");
            const roleOrError2 = Role.create("volunteer");
            const roleOrError3 = Role.create("manager");
            const roleOrError4 = Role.create("admin");
            if(roleOrError.isRight() &&
                roleOrError2.isRight() && 
                roleOrError3.isRight() &&
                roleOrError4.isRight()){

                expect(roleOrError.value.getValue()).toBe(RoleName.DONATOR);
                expect(roleOrError2.value.getValue()).toBe(RoleName.VOLUNTEER);
                expect(roleOrError3.value.getValue()).toBe(RoleName.MANAGER);
                expect(roleOrError4.value.getValue()).toBe(RoleName.ADMIN);
            } else {
                fail("Should be successful when creating roles");
            }
        })

        it("should fail when passing an invalid role name", () => {
            const roleOrError = Role.create("bipboup");
            if(roleOrError.isLeft()){
                expect(roleOrError.value).toBe("Invalid role name");
            } else {
                fail("Should not be successful");
            }
        })
    })
})