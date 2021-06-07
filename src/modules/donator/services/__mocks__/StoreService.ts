import { Donator } from "../../domain";
import { StoreService } from "../index";

const Register = {
    ok: async function(input: StoreService.RegisterInput){
        return "a valid store reference";
    },
    
    throw: async function(input: StoreService.RegisterInput){
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