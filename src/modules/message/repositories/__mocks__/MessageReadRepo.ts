export const ListByRoom = {
    empty: async (ri: string, limit: number, offset: number) => [],
    notEmpty: async (ri: string, limit: number, offset: number) => {
        return [Object.freeze({
            senderId: 'a sender id',
            content: 'some content',
            publicationDate: new Date('2020-07-15')
        })];
    },
    throw: async (ri: string, limit: number, offset: number) => { throw new Error('oopsie'); }
}