import { Showcase, ShowcaseList } from "../../domain";


export const FindById = {
    notNull: async (si: string ) => {
        return Showcase.create({
            id: si,
            name: 'a showcase name',
            email: 'a showcase email',
            bannerUrl: 'a showcase banner',
            presentation: 'a showcase presentation'
        }).getValue();
    },
    null: async (si: string ) => null,
    throw: async (si: string ) => { throw new Error('oopsie'); }
}

export const Search = {
    empty: async (input: string, limit: number, offset: number) => {
        return ShowcaseList.create([], 0).getValue();
    },
    notEmpty: async (input: string, limit: number, offset: number) => {
        return ShowcaseList.create([{
            id: 'a showcase id',
            name: 'a showcase name'
        }], 1).getValue();
    },
    throw: async (input: string, limit: number, offset: number) => { throw new Error('oopsie'); }
}