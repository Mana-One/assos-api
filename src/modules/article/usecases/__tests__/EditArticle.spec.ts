import { makeEditArticleUsecase } from '../EditArticle';
import { FindById, RemoveOrSave } from '../../repositories/__mocks__/ArticleWriteRepo';
import { ArticleErrors } from '../errors';
import { AppErrors } from '../../../../core/logic';


describe('Edit Article Usecase', () => {
    const props = {
        articleId: 'an artcle id',
        title : ' a new title'
    };
    const deps = {
        findArticle: FindById.notNull,
        save: RemoveOrSave.ok
    };

    it('should return ok result', async () => {
        const usecase = makeEditArticleUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ArticleNotFound when article does not exist', async () => {
        const usecase = makeEditArticleUsecase({
            ...deps,
            findArticle: FindById.null
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof ArticleErrors.ArticleNotFound).toBe(true);
        } else {
            fail('Result should bbe \'left\'');
        }
    })

    it('should return UnexpectedError when fetching article fails', async () => {
        const usecase = makeEditArticleUsecase({
            ...deps,
            findArticle: FindById.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should bbe \'left\'');
        }
    })

    it('should returnko result when passing invalid values', async () => {
        const usecase = makeEditArticleUsecase(deps);
        const result = await usecase({
            ...props,
            title: ''
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should bbe \'left\'');
        }
    })

    it('should return UnexpectedError when saving article fails', async () => {
        const usecase = makeEditArticleUsecase({
            ...deps,
            save: RemoveOrSave.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should bbe \'left\'');
        }
    })
})