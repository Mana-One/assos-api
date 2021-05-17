import { v4 } from "uuid";

interface UniqueIdProps {
    id: string;
}

export namespace UniqueId {
    export function create(id?: string): UniqueIdProps {
        return Object.freeze({ id: id === undefined ? v4() : id });
    }

    export function areEqual(uid1: UniqueIdProps, uid2: UniqueIdProps){
        return uid1.id === uid2.id;
    }
}