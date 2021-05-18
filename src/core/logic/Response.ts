export class Response<T> {       
    private constructor(readonly success: boolean, readonly value?: T){}

    hasValue(): boolean {
        return this.value !== undefined;
    }

    static ok<U>(value?: U): Response<U> {
        return new Response<U>(true, value);
    }

    static ko<U>(err: U): Response<U> {
        return new Response<U>(false, err);
    }
}