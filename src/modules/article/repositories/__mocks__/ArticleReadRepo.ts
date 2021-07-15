import { createArticleDto, createArticleItemDto, createArticleListDto } from "../../domain";

const mockData = {
    id: 'an article id',
    title: 'a title',
    content: 'some constent',
    publicationDate: new Date('2020-07-15')
};

export const FindById = {
    null: async (aId: string) => null,
    notNull: async (aId: string) => createArticleDto(mockData),
    throw: async (aId: string) => { throw new Error('oopsie'); }
}

export const ListByAssociation = {
    empty: async (
        associationId: string, 
        limit: number, 
        offset: number) => createArticleListDto([], 0),

    notEmpty: async (
        associationId: string, 
        limit: number, 
        offset: number) => {

        return createArticleListDto(
            [createArticleItemDto(mockData)], 
            1
        );
    },
    
    throw: async (
        associationId: string, 
        limit: number, 
        offset: number) => { 

        throw new Error('oopsie'); 
    }
    
}