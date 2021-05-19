import { UniqueId } from "../../../../../core/domain";
import { Role, User, UserEmail, UserName, UserPassword } from "../../../domain";

const props = {
    firstName: UserName.create("Paolo").getValue(),
    lastName: UserName.create("Manaois").getValue(),
    password: UserPassword.createNotHashed("azertyUIOP123$").getValue(),
    role: Role.create("donator").getValue()
}

const Save = {
    throw: async function(user: User): Promise<void> {
        throw new Error("oopsie");
    },

    ok: async function(user: User): Promise<void>{},
};

const FindByEmail = {
    notNull: async function(email: UserEmail): Promise<User | null>{
        return User.create({
            ...props,
            email
        }, new UniqueId("a valid id")).getValue();
    },
    
    null: async function(email: UserEmail): Promise<User | null>{
        return null;
    },
    
    throw: async function(email: UserEmail): Promise<User | null>{
        throw new Error("oopsie");
    }
};

export {
    Save,
    FindByEmail
}