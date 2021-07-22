import { UniqueId } from "../../../../core/domain";
import { UserEmail } from "../../../../shared/domain";
import { Association, AssociationStatus, Member } from "../../domain";

const props = {
    name: "associaiton name",
    email: UserEmail.create("assos@yahoo.com").getValue(),
    bannerUrl: "a banner url",
    presentation: "a presentation",
    status: AssociationStatus.VALID,
    storeReference: "a store reference"
}

export const CreateAssociation = {
    ok: async (association: Association, manager: Member) => {},
    throw: async (association: Association, manager: Member) => { throw new Error("oopsie"); }
}

export const FindById = {
    null: async (associationId: string) => null,
    notNull: async (associationId: string) => {
        return Association.create(
            props, 
            new UniqueId(associationId)
        ).getValue();
    },
    throw: async (associationId: string) => { throw new Error("oopsie"); }
}

export const IsEmailUsed = {
    yes: async (email: UserEmail) => true,
    no: async (email: UserEmail) => false,
    throw: async (email: UserEmail) => { throw new Error("oopsie"); }
}

export const RemoveOrSave = {
    ok: async (a: Association) => {},
    throw: async (a: Association) => { throw new Error('oopsie'); }
}