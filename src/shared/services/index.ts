import { AccessToken, TokenPayload } from "../domain";


export namespace Authentication {
    export interface CreateToken {
        (payload: TokenPayload): Promise<AccessToken>;
    }

    export interface VerifyAndRetrievePayload {
        (token: AccessToken): Promise<TokenPayload>;
    }

    export function isTokenPayload(obj: any): obj is TokenPayload {
        return !!obj === true &&
            "id" in obj && typeof obj["id"] === "string" &&
            "name" in obj && typeof obj["name"] === "string" &&
            "role" in obj && typeof obj["role"] === "string" &&
            "associationId" in obj && 
            (obj["associationId"] === null || typeof obj["associationId"] === "string");
    }
}