import { makeGetArticleUsecase } from '../GetArticle';
import { FindById } from '../../repositories/__mocks__/ArticleReadRepo';
import { ArticleErrors } from '../errors';
import { AppErrors } from '../../../../core/logic';


describe('Get Article Usecase', () => {
    const props = { articleId: 'an article id' };
    const deps = { findArticle: FindById.notNull };
    const expected = {
        id: props.articleId,
        title: 'a title',
        content: 'some constent',
        publicationDate: new Date('2020-07-15')
    };

    it('should return ok result', async () => {
        const usecase = makeGetArticleUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const dto = result.value.getValue();
            expect(dto.id).toBe(expected.id);
            expect(dto.title).toBe(expected.title);
            expect(dto.content).toBe(expected.content);
            expect(dto.publicationDate.getTime()).toBe(expected.publicationDate.getTime());

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ArticleNotFound when article does not exists', async () => {
        const usecase = makeGetArticleUsecase({ findArticle: FindById.null });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof ArticleErrors.ArticleNotFound).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when fetching article fails', async () => {
        const usecase = makeGetArticleUsecase({ findArticle: FindById.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })
})