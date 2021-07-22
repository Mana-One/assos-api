import { isNone, None } from "./None";

export class Optional<T> {
    private value: T | None;

    constructor(value: T | None){
        this.value = value;
    }

    getValue(): T {
        if(!isNone(this.value)){
            return this.value;
        }

        throw new Error('NullPointerException');
    }

    isSome(): this is { value: T } {
        return !isNone(this.value);
    }

    isNone(): this is { value: None } {
        return isNone(this.value);
    }
}