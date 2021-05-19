export abstract class Identifier<T> {
    constructor(readonly value: T){}

    equals(id?: Identifier<T>): boolean {
        if(id === null || id === undefined){
            return false
        }

        if(!(id instanceof this.constructor)){
            return false;
        }

        return id.value === this.value;
    }

    toString(): string {
        return String(this.value);
    }
}