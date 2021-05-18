import { Role } from "../../domain";

export interface RoleRepo {
    findByName(name: string): Promise<Role.Type | null>;
}