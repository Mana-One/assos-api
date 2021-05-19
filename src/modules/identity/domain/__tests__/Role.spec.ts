import { Role, RoleName } from "../Role";

describe("Role entity", () => {
    describe("creation", () => {
        it("should return a new role when passing a valid role name", () => {
            const res = Role.create("donator");
            const res2 = Role.create("volunteer");
            const res3 = Role.create("manager");
            const res4 = Role.create("admin");

            expect(res.success).toBe(true);
            expect(res2.success).toBe(true);
            expect(res3.success).toBe(true);
            expect(res4.success).toBe(true);

            const r1 = res.getValue()
            const r2 = res2.getValue();
            const r3 = res3.getValue();
            const r4 = res4.getValue();
            expect(r1.getValue()).toBe(RoleName.DONATOR);
            expect(r2.getValue()).toBe(RoleName.VOLUNTEER);
            expect(r3.getValue()).toBe(RoleName.MANAGER);
            expect(r4.getValue()).toBe(RoleName.ADMIN);
            
        })

        it("should fail when passing an invalid role name", () => {
            const res = Role.create("bipboup");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid role name");
        })
    })
})