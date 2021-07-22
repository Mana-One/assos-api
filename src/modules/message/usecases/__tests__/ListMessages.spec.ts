import { makeListMessagesUsecase } from '../ListMessages';
import { ListByRoom } from '../../repositories/__mocks__/MessageReadRepo';
import { AppErrors } from '../../../../core/logic';
import { createSenderDto } from '../../domain';
import { Role } from '../../../../shared/domain';


describe('List Messages Usecase', () => {
    const props = { roomId: ' a room id', offset: 0 };
    const deps = { listMessages: ListByRoom.notEmpty };
    const expected = {
        sender: createSenderDto({
            id: 'a sender id',
            username: 'a name',
            role: Role.VOLUNTEER
        }),
        content: 'some content',
        timestamp: new Date('2020-07-15').getTime()
    };

    it('should return ok result', async () => {
        const usecase = makeListMessagesUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const data = result.value.getValue();
            expect(data.length > 0).toBe(true);

            const dto = data[0];
            expect(dto).toEqual(expected);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ok result even with empty result set', async () => {
        const usecase = makeListMessagesUsecase({ listMessages: ListByRoom.empty });
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const data = result.value.getValue();
            expect(data.length === 0).toBe(true);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return UnexpectedResult when listing ', async () => {
        const usecase = makeListMessagesUsecase({ listMessages: ListByRoom.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })
})