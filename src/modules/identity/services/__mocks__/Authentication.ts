import { AccessToken, RoleName, TokenPayload } from "../../domain";

const createTokenKo = jest.fn()
.mockImplementation(async function(payload: TokenPayload): Promise<AccessToken> {
    throw new Error("oopsie");
});

const createTokenOk = jest.fn()
.mockImplementation(async function(payload: TokenPayload): Promise<AccessToken> {
    return "token_12346879/!;"
});

const verifyOk = jest.fn()
.mockImplementation(async function(token: AccessToken): Promise<TokenPayload> {
    return {
        id: "a valid id in a valid payload",
        role: RoleName.DONATOR
    };
});

const verifyKo = jest.fn()
.mockImplementation(async function(token: AccessToken): Promise<TokenPayload> {
    throw new Error("oopsie");
});

export {
    createTokenKo,
    createTokenOk,
    verifyKo,
    verifyOk
}