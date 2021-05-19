import { UniqueId } from "../../../../../core/domain";
import { Role, User, UserEmail, UserName, UserPassword } from "../../../domain";
import { UserRepo } from "..";

const props = {
    firstName: UserName.create("Paolo").getValue(),
    lastName: UserName.create("Manaois").getValue(),
    password: UserPassword.createHashed("azertyUIOP123$").getValue(),
    role: Role.create("donator").getValue()
}

const findByEmailNotNull = jest.fn()
.mockImplementation(async function(email: UserEmail): Promise<User | null>{
    return User.create({
        ...props,
        email
    }, new UniqueId("a valid id")).getValue();
});

const findByEmailNull = jest.fn()
.mockImplementation(async function(email: UserEmail): Promise<User | null>{
    return null;
});

const saveOk = jest.fn()
.mockImplementation(async function(user: User): Promise<void>{});

const saveKo = jest.fn()
.mockImplementation(async function(user: User): Promise<void> {
    throw new Error("oopsie");
})

export {
    saveKo,
    saveOk,
    findByEmailNotNull,
    findByEmailNull
}