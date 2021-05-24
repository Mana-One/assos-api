import { UniqueId } from "../../../../../core/domain";
import { Role, User, UserEmail, UserName, UserPassword } from "../../../domain";

const props = {
    firstName: UserName.create("Paolo").getValue(),
    lastName: UserName.create("Manaois").getValue(),
    email: UserEmail.create("test@test.test").getValue(),
    password: UserPassword.createNotHashed("azertyUIOP123$").getValue(),
    role: Role.DONATOR,
    associationId: null
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

const FindById = {
    ok: async function(userId: string): Promise<User | null>{
        return User.create({
            ...props
        }, new UniqueId("a valid id")).getValue();
    },

    ko: async function(userId: string): Promise<User | null>{
        return null;
    },

    throw: async function(userId: string): Promise<User | null>{
        throw new Error("oopsie");
    }
}

const DeleteUser = {
    ok: async function(user: User): Promise<void> {},
    throw: async function(user: User): Promise<void> {
        throw new Error("oopsie");
    }
}

export {
    Save,
    FindByEmail,
    FindById,
    DeleteUser
}