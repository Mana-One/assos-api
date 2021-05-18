import { shallowEqual } from "shallow-equal-object";

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    constructor(protected props: T){}

    equals(obj?: ValueObject<T>): boolean {
        if(obj === null || obj === undefined){
            return false;
        }

        if(obj.props === undefined){
            return false;
        }

        return shallowEqual(obj.props, this.props);
    }
}