export class Result<T> {       
    private constructor(readonly success: boolean, readonly value?: T){}

    hasValue(): boolean {
        return this.value !== undefined;
    }

    static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, value);
    }

    static ko<U>(err: U): Result<U> {
        return new Result<U>(false, err);
    }
}