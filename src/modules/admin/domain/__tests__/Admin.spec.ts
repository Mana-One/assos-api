import { UniqueId } from "../../../../core/domain";
import { UserName, UserEmail, UserPassword, Role } from "../../../../shared/domain";
import { Admin } from "../index";


describe("Admin entity", () => {
    describe("creation", () => {
        const uid = new UniqueId("an admin id");
        const props = {
            firstName: UserName.create("Paolo").getValue(),
            lastName: UserName.create("Manaois").getValue(),
            email: UserEmail.create("username@yahoo.com").getValue(),
            role: Role.ADMIN,
            password: UserPassword.createNotHashed("azertyUIOP123$").getValue()
        };
        
        it("should return a Admin instance", () => {
            const result = Admin.create(props, uid);
            const admin = result.getValue();
            expect(result.success).toBe(true);
            expect(admin instanceof Admin).toBe(true);
            expect(admin.getId().equals(uid)).toBe(true);
            expect(admin.getFirstName().equals(props.firstName)).toBe(true);
            expect(admin.getLastName().equals(props.lastName)).toBe(true);
            expect(admin.getEmail().equals(props.email)).toBe(true);
        })

        it("should return a Admin instance without passing an id", () => {
            const result = Admin.create(props, uid);
            const admin = result.getValue();
            expect(result.success).toBe(true);
            expect(admin instanceof Admin).toBe(true);
            expect(admin.getId()).toBeTruthy();
            expect(admin.getFirstName().equals(props.firstName)).toBe(true);
            expect(admin.getLastName().equals(props.lastName)).toBe(true);
            expect(admin.getEmail().equals(props.email)).toBe(true);
        })
    })
})