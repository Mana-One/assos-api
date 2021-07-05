import { UserEmail } from "../../../../shared/domain";
import { Association, Member } from "../../domain";

export const CreateAssociation = {
    ok: async (association: Association, manager: Member) => {},
    throw: async (association: Association, manager: Member) => { throw new Error("oopsie"); }
}

export const IsEmailUsed = {
    yes: async (email: UserEmail) => true,
    no: async (email: UserEmail) => false,
    throw: async (email: UserEmail) => { throw new Error("oopsie"); }
}