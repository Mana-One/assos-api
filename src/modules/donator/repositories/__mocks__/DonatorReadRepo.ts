import { createDonatorListDto, createDonatorListItemDto } from "../../domain"

export const expected = {
    id: 'a donator id',
    firstName: 'a firstname',
    lastName: 'a lastname'
}

export const ListDonators = {
    empty: async (limit: number, offset: number) => createDonatorListDto([], 0),
    notEmpty: async (limit: number, offset: number) => {
        return createDonatorListDto(
            [createDonatorListItemDto(expected)],
            1
        )
    },
    throw: async (limit: number, offset: number) => { throw new Error('oopsie'); }    
}