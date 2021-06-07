import { UniqueId } from "../../../../core/domain";
import { Role } from "../../../../shared/domain";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { User } from "../../domain";

const props = {
    firstName: UserName.create("FirstName").getValue(),
    lastName: UserName.create("LastName").getValue(),
    email: UserEmail.create("test@test.test").getValue(),
    password: UserPassword.createNotHashed("azertyUIOP123$").getValue(),
    role: Role.DONATOR
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

export {
    Save,
    FindByEmail,
    FindById
}