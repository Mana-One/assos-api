import { Article } from "../../domain";

export const Save = {
    ok: async (article: Article) => {},
    throw: async (article: Article) => { throw new Error('oopsie'); }
}