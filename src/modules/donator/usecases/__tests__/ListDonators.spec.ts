import { AppErrors } from '../../../../core/logic';
import { ListDonators, expected } from '../../repositories/__mocks__/DonatorReadRepo';
import { makeListDonatorsUsecase } from '../ListDonators';


describe('List Donators Usecase', () => {
    const props = { limit: 20, offset: 0 };
    const deps = { list: ListDonators.notEmpty };

    it('should return ok result', async () => {
        const usecase = makeListDonatorsUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const res = result.value.getValue();
            expect(res.total > 0).toBe(true);

            const dto = res.data[0];
            expect(dto).toEqual(expected);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ok result even with an empty result set', async () => {
        const usecase = makeListDonatorsUsecase({ list: ListDonators.empty });
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const res = result.value.getValue();
            expect(res.total).toBe(0);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return UnexpectedError when listing donators fails', async () => {
        const usecase = makeListDonatorsUsecase({ list: ListDonators.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })
})