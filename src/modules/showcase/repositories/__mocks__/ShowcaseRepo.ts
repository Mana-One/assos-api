import { ShowcaseList } from "../../domain";


export const Search = {
    empty: async (input: string, limit: number, offset: number) => {
        return ShowcaseList.create([]).getValue();
    },
    notEmpty: async (input: string, limit: number, offset: number) => {
        return ShowcaseList.create([{
            id: 'a showcase id',
            name: 'a showcase name'
        }]).getValue();
    },
    throw: async (input: string, limit: number, offset: number) => { throw new Error('oopsie'); }
}