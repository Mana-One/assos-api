import { UniqueId } from "../../../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../../../shared/domain";
import { Donator, Wallet } from "../../../domain";

const IsEmailUsed = {
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

const FindById = {
    notNull: async function(donatorId: UniqueId) {
        return Donator.create({
            firstName: UserName.create("Paolo").getValue(),
            lastName: UserName.create("Manaois").getValue(),
            email: UserEmail.create("username@yahoo.com").getValue(),
            password: UserPassword.createHashed("azertyUIOP123$").getValue(),
            storeReference: "a valid store reference",
            wallet: new Wallet()
        }, donatorId).getValue();
    },

    null: async function(donatorId: UniqueId){
        return this.null;
    },

    throw: async function(donatorId: UniqueId){
        throw new Error("oopsie");
    }
};

const RemoveOrSave = {
    ok: async function(donator: Donator){},
    throw: async function(donator: Donator){
        throw new Error("oopsie");
    }
}

export {
    IsEmailUsed,
    FindById,
    RemoveOrSave
}