import { Donation } from "../../domain";

export const Save = {
    ok: async (donation: Donation) => {},
    throw: async (donation: Donation) => { throw new Error("oopsie"); }
}