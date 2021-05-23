import { UniqueId } from "../../../../core/domain";
import { Result } from "../../../../core/logic";
import { AssociationId } from "../AssociationId";
import { Role } from "../Role";
import { User } from "../User";
import { UserEmail } from "../UserEmail";
import { UserName } from "../UserName";
import { UserPassword } from "../UserPassword";

describe("User entity", () => {
    const firstName = UserName.create("Paolo");
    const lastName = UserName.create("Manaois");
    const email = UserEmail.create("username@yahoo.com");
    const password = UserPassword.createHashed("azertyUIOP123$");
    const res = Result.combine([firstName, lastName, email, password]);
    if(!res.success){
        fail("Should be able to create value objects");
    }

    const uid = new UniqueId("a valid id");
    const associationId = new AssociationId("an id");
    let props;

    beforeEach(() => {
        props = {
            firstName: firstName.getValue(),
            lastName: lastName.getValue(),
            email: email.getValue(),
            password: password.getValue(),
            role: Role.VOLUNTEER,
            associationId
        }
    })

    describe("creation", () => {
        it("should return a new User when passing an undefined id", () => {
            const res = User.create(props);
            expect(res.success).toBe(true);

            const user = res.getValue();            
            expect(user.getId().value).toBeTruthy();
            expect(user.getFirstName().getValue()).toBe("Paolo");
            expect(user.getLastName().getValue()).toBe("Manaois");
            expect(user.getEmail().getValue()).toBe("username@yahoo.com");
            expect(user.getRole()).toBe(Role.VOLUNTEER);
            expect(user.getAssociationId().value).toBe(associationId.value);
        })      
        
        it("should return a new User when passing a valid id", () => {
            const res = User.create(props, uid);
            expect(res.success).toBe(true);
            const user = res.getValue();
            expect(user.getId().value).toBe("a valid id");
            expect(user.getFirstName().getValue()).toBe("Paolo");
            expect(user.getLastName().getValue()).toBe("Manaois");
            expect(user.getEmail().getValue()).toBe("username@yahoo.com");
            expect(user.getRole()).toBe(Role.VOLUNTEER);
            expect(user.getAssociationId().value).toBe(associationId.value);
        })

        it("should return a new User with null associationId when no association id is passed", () => {
            delete props.associationId;
            props.role = Role.DONATOR;
            const res = User.create(props, uid);
            expect(res.success).toBe(true);

            const user = res.getValue();
            expect(user.getId().value).toBe("a valid id");
            expect(user.getFirstName().getValue()).toBe("Paolo");
            expect(user.getLastName().getValue()).toBe("Manaois");
            expect(user.getEmail().getValue()).toBe("username@yahoo.com");
            expect(user.getRole()).toBe(Role.DONATOR);
            expect(user.getAssociationId()).toBe(null);
        })

        it("should return a new User with role as 'donator' when no role is passed", () => {
            delete props.role;
            delete props.associationId;
            const res = User.create(props, uid);
            expect(res.success).toBe(true);

            const user = res.getValue();
            expect(user.getId().value).toBe("a valid id");
            expect(user.getFirstName().getValue()).toBe("Paolo");
            expect(user.getLastName().getValue()).toBe("Manaois");
            expect(user.getEmail().getValue()).toBe("username@yahoo.com");
            expect(user.getRole()).toBe(Role.DONATOR);
            expect(user.getAssociationId()).toBe(null);
        })

        it("should fail when creating a donator with an association id", () => {
            props.role = Role.DONATOR;
            const res = User.create(props, uid);
            expect(res.success).toBe(false);
        })

        it("should fail when creating an admin with an association id", () => {
            props.role = Role.ADMIN;
            const res = User.create(props, uid);
            expect(res.success).toBe(false);
        })

        it("should fail when creating a volunteer without an association id", () => {
            delete props.role;
            const res = User.create(props, uid);
            expect(res.success).toBe(false);
        })

        it("should fail when creating an admin with an association id", () => {
            props.role = Role.MANAGER;
            delete props.role;
            const res = User.create(props, uid);
            expect(res.success).toBe(false);
        })
    })
})