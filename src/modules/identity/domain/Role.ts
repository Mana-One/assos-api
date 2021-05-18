import { UniqueId, UniqueIdProps } from "../../../core/domain";
import { Guard } from "../../../core/logic";
import { IdentityErrors } from "./errors";

export namespace Role {
    export type Type = {
        readonly id: UniqueIdProps;
        readonly name: string;
    } 

    export enum Values {
        DONATOR = "donator",
        VOLUNTEER = "volunteer",
        MANAGER = "manager",
        ADMIN = "admin"
    }

    export function isRoleValue(value: any): value is Values {
        return value === Values.DONATOR ||
            value === Values.MANAGER ||
            value === Values.VOLUNTEER ||
            value === Values.ADMIN;
    }

    export function create(rolename: string, id?: string): Type {
        Guard.againstNullOrUndefined({
            value: rolename,
            key: "role name"
        });

        if(!isRoleValue(rolename)){
            throw new IdentityErrors.InvalidRole();
        }

        const uid = UniqueId.create(id);
        return Object.freeze({
            id: uid,
            name: rolename
        })
    }
}