import { UniqueId } from "../../../../core/domain";
import { Role, UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Member } from "../../domain";


const props = {
    firstName: UserName.create("Paolo").getValue(),
    lastName: UserName.create("Manaois").getValue(),
    email: UserEmail.create("manager@yahoo.com").getValue(),
    password: UserPassword.createHashed("azertyUIOP123$").getValue(),
    role: Role.MANAGER
};

export const CountManagers = {
    one: async (aId: string) => 1,
    moreThanOne: async (aId: string) => 2,
    throw: async (aID: string) => { throw new Error("oopsie"); }
}

export const FindMember = {
    null: async (mId: string, aId:string) => null,
    notNull: async (mId: string, aId:string) => {
        return Member.create(
            {
                ...props,
                associationId: new UniqueId(aId) 
            }, 
            new UniqueId(mId)
        ).getValue();
    },
    throw: async (mId: string, aId:string) => { throw new Error("oopsie"); }
}

export const RemoveOrSave = {
    ok: async (m: Member) => {},
    throw: async (m: Member) => { throw new Error("oopsie"); }
}