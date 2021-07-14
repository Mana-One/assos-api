import { makeCreateArticleUsecase } from '../CreateArticle';
import { Save } from '../../repositories/__mocks__/ArticleWriteRepo';
import { AppErrors } from '../../../../core/logic';


describe('Create Article Usecase', () => {
    const deps = { save: Save.ok };
    const props = {
        title: 'a title',
        content: 'some content',
        associationId: 'an association id'
    };

    it('should return ok result', async () => {
        const usecase = makeCreateArticleUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ko result when passing invalid values', async () => {
        const usecase = makeCreateArticleUsecase(deps);
        const result = await usecase({ 
            ...props,
            title: ''
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value.getValue()).toBe('Invalid title');
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when saving article fails', async () => {
        const usecase = makeCreateArticleUsecase({ save: Save.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })
})