import { IdentityErrors } from "../errors";
import { Role } from "../Role";

describe("Role entity", () => {
    describe("creation", () => {
        it("should return a new role when passing an undefined id and a valid role name", () => {
            const role = Role.create("donator");
            const role2 = Role.create("volunteer");

            expect(role).toBeTruthy();
            expect(role.id.value).toBeTruthy();
            expect(role.name).toBe(Role.Values.DONATOR);
            expect(role2).toBeTruthy();
            expect(role2.id.value).toBeTruthy();
            expect(role2.name).toBe(Role.Values.VOLUNTEER);
        })

        it("should return a new role when passing an existing id and a valid role name", () => {
            const role = Role.create("admin", "a valid id");
            const role2 = Role.create("manager", "another valid id");

            expect(role).toBeTruthy();
            expect(role.id.value).toBe("a valid id");
            expect(role.name).toBe(Role.Values.ADMIN);            
            expect(role2).toBeTruthy();
            expect(role2.id.value).toBe("another valid id");
            expect(role2.name).toBe(Role.Values.MANAGER);
        })

        it("should fail when passing an invalid role name", () => {
            expect(() => Role.create("donator56", "bipboup")).toThrow(IdentityErrors.InvalidRole);
        })
    })
})