import { AccessToken, TokenPayload } from "../domain";

export interface Authentication {
    createToken(payload: TokenPayload): Promise<AccessToken>;
    verifyAndRetrievePayload(token: AccessToken): Promise<TokenPayload>
}

export function isTokenPayload(obj: any): obj is TokenPayload {
    return !!obj === true &&
        "id" in obj && typeof obj["id"] === "string" &&
        "role" in obj && typeof obj["role"] === "string";
}