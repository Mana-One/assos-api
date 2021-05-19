import { UniqueId } from "../../../../core/domain";
import { Result } from "../../../../core/logic";
import { IdentityErrors } from "../errors";
import { Role } from "../Role";
import { User } from "../User";
import { UserEmail } from "../UserEmail";
import { UserName } from "../UserName";
import { UserPassword } from "../UserPassword";

describe("User entity", () => {
    const role = Role.create("donator");
    const firstName = UserName.create("Paolo");
    const lastName = UserName.create("Manaois");
    const email = UserEmail.create("username@yahoo.com");
    const password = UserPassword.createHashed("azertyUIOP123$");
    const res = Result.combine([role, firstName, lastName, email, password]);
    if(!res.success){
        fail("Should be able to create value objects");
    }

    const props = {
        firstName: firstName.getValue(),
        lastName: lastName.getValue(),
        email: email.getValue(),
        password: password.getValue(),
        Role: role.getValue()
    }

    describe("creation", () => {
        it("should return a new User when passing an undefined id", () => {
            const res = User.create(props);
            expect(res.success).toBe(true);

            const user = res.getValue();
            expect(user.getId().value).toBeTruthy();
            expect(user.getFirstName().getValue()).toBe("Paolo");
            expect(user.getLastName().getValue()).toBe("Manaois");
            expect(user.getEmail().getValue()).toBe("username@yahoo.com");
        })      
        
        it("should return a new User when passing a valid id", () => {
            const uid = new UniqueId("a valid id");
            const res = User.create(props, uid);
            expect(res.success).toBe(true);
            const user = res.getValue();
            expect(user.getId().value).toBe("a valid id");
            expect(user.getFirstName().getValue()).toBe("Paolo");
            expect(user.getLastName().getValue()).toBe("Manaois");
            expect(user.getEmail().getValue()).toBe("username@yahoo.com");
        })
    })
})