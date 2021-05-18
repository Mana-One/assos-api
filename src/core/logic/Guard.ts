export namespace Guard {
    export class MissingValue extends Error {
        constructor(propertyName: string){
            super(`Missing value for ${propertyName}`);
        }
    }

    interface GuardArgument {
        value: any;
        key: string;
    }

    export function againstNullOrUndefined(arg: GuardArgument){
        if(arg.value === undefined || arg.value === null){
            throw new MissingValue(arg.key);
        }
    }

    export function bulkAgainstNullOrUndefined(args: GuardArgument[]){
        for(const arg of args){
            againstNullOrUndefined(arg);
        }
    }
}