import { v4 } from "uuid";

export interface UniqueIdProps {
    value: string;
}

export namespace UniqueId {
    export function create(id?: string): UniqueIdProps {
        return Object.freeze({ value: id === undefined ? v4() : id });
    }

    export function areEqual(uid1: UniqueIdProps, uid2: UniqueIdProps){
        return uid1.value === uid2.value;
    }
}