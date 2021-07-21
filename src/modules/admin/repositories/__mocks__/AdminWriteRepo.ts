import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Admin } from "../../domain";


export const Exists = {
    yes: async (email: string) => true,
    no: (email: string) => false,
    throw: async (email: string) => { throw new Error('oopsie'); }
}

export const FindById = {
    null: async (id: string) => null,
    notNull: async (id: string) => Admin.create({
        firstName: UserName.create('a first name').getValue(),
        lastName: UserName.create('a last name').getValue(),
        email: UserEmail.create('username@yahoo.com').getValue(),
        password: UserPassword.createNotHashed('azertyUIOP123$').getValue()
    }).getValue(),
    throw: async (id: string) => { throw new Error('oopsie'); }
}

export const RemoveOrSave = {
    ok: async (admin: Admin) => {},
    throw: async (admin: Admin) => { throw new Error('oopsie'); }
}