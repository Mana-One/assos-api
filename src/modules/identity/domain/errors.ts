export namespace IdentityErrors {
    export class InvalidPassword extends Error {
        constructor(){
            super("Password must have 8 to 32 chars, with at least 1 uppercase, 1 lowercase, 1 number and 1 special symbol");
        }
    }

    export class InvalidName extends Error {
        constructor(){
            super("Invalid name entry: must have 1 to 100 chars");
        }
    }

    export class InvalidEmail extends Error {
        constructor(){
            super("Invalid email");
        }
    }
}