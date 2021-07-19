import { Role } from "../../../../shared/domain";
import { createSenderDto } from "../../domain";

export const ListByRoom = {
    empty: async (ri: string, limit: number, offset: number) => [],
    notEmpty: async (ri: string, limit: number, offset: number) => {
        return [Object.freeze({
            sender: createSenderDto({
                id: 'a sender id',
                username: 'a name',
                role: Role.VOLUNTEER
            }),
            content: 'some content',
            timestamp: new Date('2020-07-15').getTime()
        })];
    },
    throw: async (ri: string, limit: number, offset: number) => { throw new Error('oopsie'); }
}