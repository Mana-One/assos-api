import { Member } from "../../domain";

export const Save = {
    ok: async (m: Member) => {},
    throw: async (m: Member) => { throw new Error("oopsie"); }
}