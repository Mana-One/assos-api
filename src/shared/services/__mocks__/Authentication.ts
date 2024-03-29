import { AccessToken, Role, TokenPayload } from "../../domain";

const CreateToken = {
    ok: async function(payload: TokenPayload): Promise<AccessToken> {
        return "token_12346879/!;"
    },

    throw: async function(payload: TokenPayload): Promise<AccessToken> {
        throw new Error("oopsie");
    }
};

const VerifyAndRetrievePayload = {
    ok: async function(token: AccessToken): Promise<TokenPayload> {
        return {
            id: "a valid id in a valid payload",
            username: "a name",
            role: Role.DONATOR,
            associationId: null
        };
    },

    throw: async function(token: AccessToken): Promise<TokenPayload> {
        throw new Error("oopsie");
    }
};

export {
    CreateToken,
    VerifyAndRetrievePayload
}