import { isNone, None } from "./None";

export class Option<T> {
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

    hasSome(): this is { value: T } {
        return !isNone(this.value);
    }

    hasNone(): this is { value: None } {
        return isNone(this.value);
    }
}