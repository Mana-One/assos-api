import { Admin } from "../../domain";


export const RemoveOrSave = {
    ok: async (admin: Admin) => {},
    throw: async (admin: Admin) => { throw new Error('oopsie'); }
}