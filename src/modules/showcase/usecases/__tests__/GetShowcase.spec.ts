import { makeGetShowcaseUsecase } from '../GetShowcase';
import { FindById } from '../../repositories/__mocks__/ShowcaseRepo';
import { ShowcaseErrors } from '../errors';
import { AppErrors } from '../../../../core/logic';


describe('Get Showcase Usecase', () => {
    const deps = { getShowcase: FindById.notNull };
    const props = { showcaseId: 'a showcase id' };
    const expected = {
        id: props.showcaseId,
        name: 'a showcase name',
        email: 'a showcase email',
        bannerUrl: 'a showcase banner',
        presentation: 'a showcase presentation'
    };

    it('should return ok result', async () => {
        const usecase = makeGetShowcaseUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const dto = result.value.getValue();
            expect(dto).toEqual(expected);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ShowcaseNotFound when showcase does not exist', async () => {
        const usecase = makeGetShowcaseUsecase({ getShowcase: FindById.null });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof ShowcaseErrors.ShowcaseNotFound).toBe(true);

        } else {
            fail('Result should be \'left\'');
        }        
    })

    it('should return UnexpectedErrord when fetching showcase fails', async () => {
        const usecase = makeGetShowcaseUsecase({ getShowcase: FindById.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);

        } else {
            fail('Result should be \'left\'');
        }        
    })
})