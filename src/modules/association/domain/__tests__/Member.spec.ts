import { UniqueId } from "../../../../core/domain";
import { UserName, UserEmail, UserPassword, Role } from "../../../../shared/domain";
import { Member } from "../Member";


describe("Member entity", () => {
    describe("creation", () => {
        const uid = new UniqueId("a member id");
        const firstName = UserName.create("Paolo").getValue();
        const lastName = UserName.create("Manaois").getValue();
        const email = UserEmail.create("username@yahoo.com").getValue();
        const role = Role.VOLUNTEER;
        const password = UserPassword.createNotHashed("azertyUIOP123$").getValue();
        const associationId = new UniqueId("an association id");

        const props = {
            firstName,
            lastName,
            email,
            role,
            password,
            associationId
        };
        
        it("should return a Member instance", () => {
            const result = Member.create(props, uid);
            const member = result.getValue();
            expect(result.success).toBe(true);
            expect(member instanceof Member).toBe(true);
            expect(member.getId().equals(uid)).toBe(true);
            expect(member.getFirstName().equals(firstName)).toBe(true);
            expect(member.getLastName().equals(lastName)).toBe(true);
            expect(member.getEmail().equals(email)).toBe(true);
            expect(member.getRole()).toBe(role);
            expect(member.getAssociationId().equals(associationId)).toBe(true);
        })

        it("should return a Member instance without passing an id", () => {
            const result = Member.create(props, uid);
            const member = result.getValue();
            expect(result.success).toBe(true);
            expect(member instanceof Member).toBe(true);
            expect(member.getId()).toBeTruthy();
            expect(member.getFirstName().equals(firstName)).toBe(true);
            expect(member.getLastName().equals(lastName)).toBe(true);
            expect(member.getEmail().equals(email)).toBe(true);
            expect(member.getRole()).toBe(role);
            expect(member.getAssociationId().equals(associationId)).toBe(true);
        })

        it("should fail when passing a role other than 'volunteer' or 'manager'", () => {      
            const result = Member.create({
                ...props,
                role: Role.ADMIN
            }, uid);
            expect(result.success).toBe(false);
            expect(result.getValue()).toBe("Invalid role");
        })
    })
})