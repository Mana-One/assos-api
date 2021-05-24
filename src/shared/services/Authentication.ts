import { AccessToken, TokenPayload } from "../domain";

export interface Authentication {
    createToken(payload: TokenPayload): Promise<AccessToken>;
    verifyAndRetrievePayload(token: AccessToken): Promise<TokenPayload>
}