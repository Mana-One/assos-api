import { makeListArticlesUsecase } from '../ListArticles';
import { ListByAssociation } from '../../repositories/__mocks__/ArticleReadRepo';
import { AppErrors } from '../../../../core/logic';


describe('List Artiles Usecase', () => {
    const props = {
        associationId: 'an association id',
        limit: 20,
        offset: 0
    };
    const deps = { listArticles: ListByAssociation.notEmpty };
    const expected = {
        id: 'an article id',
        title: 'a title'
    };

    it('should return ok result', async () => {
        const usecase = makeListArticlesUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const paginated = result.value.getValue();
            expect(paginated.total).toBe(1);

            const dto = paginated.data[0];
            expect(dto).toEqual(expected);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ok result even with empty result set', async () => {
        const usecase = makeListArticlesUsecase({ listArticles: ListByAssociation.empty });
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const paginated = result.value.getValue();
            expect(paginated.total).toBe(0);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return UnexpectedError when listing articles fails', async () => {
        const usecase = makeListArticlesUsecase({ listArticles: ListByAssociation.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })
})