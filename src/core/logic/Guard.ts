export namespace Guard {
    export interface Argument {
        value: any;
        key: string;
    }

    export interface Result {
        success: boolean;
        message?: string;
    }

    export function againstNullOrUndefined(arg: Argument): Result {
        if(arg.value === undefined || arg.value === null){
           return { success: false, message: `Missing value for '${arg.key}'` };
        }
        return { success: true };
    }

    export function bulkAgainstNullOrUndefined(args: Argument[]): Result {
        for(const arg of args){
            const result = againstNullOrUndefined(arg);
            if(!result.success){
                return result;
            }
        }
        return { success: true };
    }
}