import { Message } from "../../domain";

const Save = {
    ok: async (m: Message) => {},
    throw: async (m: Message) => { throw new Error('oopsie'); }
}