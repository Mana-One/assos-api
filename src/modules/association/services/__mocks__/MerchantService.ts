export const RegisterMerchant = {
    ok: async (name: string, email: string) => "an association reference",
    throw: async (name: string, email: string) => { throw new Error("oopsie"); }
}