import { RoleName } from "./Role";

export interface TokenPayload {
    id: string;
    role: RoleName
}

export type AccessToken = string;