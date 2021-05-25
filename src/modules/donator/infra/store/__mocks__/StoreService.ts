import { Donator } from "../../../domain";
import { RegisterInput } from "../StoreService";

const Register = {
    ok: async function(input: RegisterInput){
        return "a valid store reference";
    },
    
    throw: async function(input: RegisterInput){
        throw new Error("oopsie");
    }
};

const RemoveDonator = {
    ok: async function(donator: Donator){},
    throw: async function(donator: Donator){
        throw new Error("oopsie");
    }
};

export {
    Register,
    RemoveDonator
}