import { UniqueId } from "../../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Donator } from "../../domain";

export const IsEmailUsed = {
    yes: async function(email: UserEmail){
        return true;
    },

    no: async function(email: UserEmail){
        return false;
    },

    throw: async function(email: UserEmail){
        throw new Error("oopsie");
    }
};

export const FindById = {
    notNull: async function(donatorId: string) {
        return Donator.create({
            firstName: UserName.create("Paolo").getValue(),
            lastName: UserName.create("Manaois").getValue(),
            email: UserEmail.create("username@yahoo.com").getValue(),
            password: UserPassword.createHashed("azertyUIOP123$").getValue(),
            storeReference: "a valid store reference"
        }, new UniqueId(donatorId)).getValue();
    },

    null: async function(donatorId: string){
        return null;
    },

    throw: async function(donatorId: string){
        throw new Error("oopsie");
    }
};

export const RemoveOrSave = {
    ok: async function(donator: Donator){},
    throw: async function(donator: Donator){
        throw new Error("oopsie");
    }
}