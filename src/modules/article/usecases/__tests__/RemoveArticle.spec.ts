import { makeRemoveArticleUsecase } from '../RemoveArticle';
import { FindById, RemoveOrSave } from '../../repositories/__mocks__/ArticleWriteRepo';
import { ArticleErrors } from '../errors';
import { AppErrors } from '../../../../core/logic';


describe('Remove Article Usecase', () => {
    const deps = {
        findArticle: FindById.notNull,
        remove: RemoveOrSave.ok
    };
    const props = { articleId: 'an article id' };

    it('should return ok result', async () => {
        const usecase = makeRemoveArticleUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ArticleNotFound when article does not exist', async () => {
        const usecase = makeRemoveArticleUsecase({
            ...deps,
            findArticle: FindById.null
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof ArticleErrors.ArticleNotFound).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when fetching article fails', async () => {
        const usecase = makeRemoveArticleUsecase({
            ...deps,
            findArticle: FindById.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when removing article fails', async () => {
        const usecase = makeRemoveArticleUsecase({
            ...deps,
            remove: RemoveOrSave.throw
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