import { makeSearchShowcasesUsecase } from '../SearchShowcases';
import { Search } from '../../repositories/__mocks__/ShowcaseRepo';
import { AppErrors } from '../../../../core/logic';


describe('Search Showcases Usecase', () => {
    const deps = { search: Search.notEmpty };
    const props = {
        input: 'test',
        limit: 20,
        offset: 0
    };
    const expected = {
        id: 'a showcase id',
        name: 'a showcase name'
    };

    it("should return ok result", async () => {
        const usecase = makeSearchShowcasesUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const list = result.value.getValue();
            expect(list.total).toBe(1);

            const dto = list.data[0];
            expect(dto.id).toBe(expected.id);
            expect(dto.name).toBe(expected.name);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it("should return ok result when result is empty", async () => {
        const usecase = makeSearchShowcasesUsecase({
            search: Search.empty
        });
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const list = result.value.getValue();
            expect(list.total).toBe(0);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ko result when passing an empty input', async () => {
        const usecase = makeSearchShowcasesUsecase(deps);
        const result = await usecase({
            ...props,
            input: ''
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedResult when listing showcases fails', async () => {
        const usecase = makeSearchShowcasesUsecase({
            search: Search.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })
})