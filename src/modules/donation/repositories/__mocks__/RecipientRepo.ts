export const Exists = {
    yes: async function(s: string){
        return true;
    },

    no: async function(s: string){
        return false; 
    },

    throw: async function(s: string){ throw new Error("oopsie"); }
}