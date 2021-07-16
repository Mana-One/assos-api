import { AppErrors } from '../../../../core/logic';
import { Save } from '../../repositories/__mocks__/MessageWriteRepo';
import { makePostMessageUsecase } from '../PostMessage';


describe('Post Message Usecase', () => {
    const props = {
        senderId:'a sender id',
        roomId: 'a room id',
        content: 'some content',
    };
    const deps = { save: Save.ok };

    it('should return ok result', async () => {
        const usecase = makePostMessageUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ko result when passing empty content', async () => {
        const usecase = makePostMessageUsecase(deps);
        const result = await usecase({
            ...props,
            content: ''
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when saving message fails', async () => {
        const usecase = makePostMessageUsecase({ save: Save.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left \'');
        }
    })
})