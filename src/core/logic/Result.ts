export class Result<T> {       
    private constructor(readonly success: boolean, private error?: T | string, private value?: T){
        if(success && !!error){
            throw new Error("Conflict: success cannot have an error");
        }

        if(!success && error === undefined){
            throw new Error("Conflict: failure must have an error");
        }
    }

    getValue(): T {
        if(!this.success){
            return this.error as T;
        }

        if(this.value === undefined){
            throw new Error("A value was not provided");
        }

        return this.value;
    }

    static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    static ko<U>(err: any): Result<U> {
        return new Result<U>(false, err);
    }
}