import { Role } from "./Role";

export interface TokenPayload {
    id: string;
    username: string;
    role: Role;
    associationId: string | null;
}

export type AccessToken = string;