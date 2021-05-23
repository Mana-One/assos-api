import { Role } from "./Role";

export interface TokenPayload {
    id: string;
    role: Role;
    associationId: string;
}

export type AccessToken = string;