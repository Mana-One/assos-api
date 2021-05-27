import { UniqueId } from "../../../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../../../shared/domain";
import { Card, CardLast4, Donator, Wallet } from "../../../domain";

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

    fullWallet: async function(donatorId: UniqueId) {
        const cards: Card[] = [];
        for(let i = 0; i < Donator.WALLET_CAPACITY; i++){
            cards.push(Card.create({
                last4: CardLast4.create("1234").getValue(),
                storeReference: "a reference"
            }, new UniqueId(`a valid id${i}`)).getValue());
        }

        return Donator.create({
            firstName: UserName.create("Paolo").getValue(),
            lastName: UserName.create("Manaois").getValue(),
            email: UserEmail.create("username@yahoo.com").getValue(),
            password: UserPassword.createHashed("azertyUIOP123$").getValue(),
            storeReference: "a valid store reference",
            wallet: new Wallet(cards)
        }, donatorId).getValue();
    },

    null: async function(donatorId: UniqueId){
        return null;
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