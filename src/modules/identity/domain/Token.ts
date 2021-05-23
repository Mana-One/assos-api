import { Role } from "./Role";

export interface TokenPayload {
    id: string;
    role: Role
}

export type AccessToken = string;