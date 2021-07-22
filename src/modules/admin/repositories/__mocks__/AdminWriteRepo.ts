import { UniqueId } from "../../../../core/domain";
import { Optional } from "../../../../core/logic";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Admin } from "../../domain";


function getMockAdmin(id: string): Admin {
    return Admin.create({
        firstName: UserName.create('a first name').getValue(),
        lastName: UserName.create('a last name').getValue(),
        email: UserEmail.create('username@yahoo.com').getValue(),
        password: UserPassword.createNotHashed('azertyUIOP123$').getValue()
    }, new UniqueId(id)).getValue();
}

export const Exists = {
    yes: async (email: string) => true,
    no: async (email: string) => false,
    throw: async (email: string) => { throw new Error('oopsie'); }
}

export const FindById = {
    none: async (id: string) => new Optional<Admin>(null),
    some: async (id: string) => new Optional<Admin>(getMockAdmin(id)),
    throw: async (id: string) => { throw new Error('oopsie'); }
}

export const RemoveOrSave = {
    ok: async (admin: Admin) => {},
    throw: async (admin: Admin) => { throw new Error('oopsie'); }
}