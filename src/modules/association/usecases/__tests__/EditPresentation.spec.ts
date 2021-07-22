import { makeEditPresentationUsecase } from '../EditPresentation';
import { FindById, RemoveOrSave } from '../../repositories/__mocks__/AssociationRepo';
import { AssociationErrors } from '../errors';
import { AppErrors, Result } from '../../../../core/logic';


describe('Edit Presentation Usecase', () => {
    const props = {
        associationId: 'an association id',
        presentation: '## a title \\\nHey'
    };

    const deps = {
        findAssociation: FindById.notNull,
        save: RemoveOrSave.ok
    };

    it('should return ok result', async () => {
        const usecase = makeEditPresentationUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true)
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return AssociationNotFound when association does not exist', async () => {
        const usecase = makeEditPresentationUsecase({ 
            ...deps,
            findAssociation: FindById.null
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AssociationErrors.AssociationNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when fetching association fails', async () => {
        const usecase = makeEditPresentationUsecase({ 
            ...deps,
            findAssociation: FindById.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return ko result when passing an invalid presentation', async () => {
        const usecase = makeEditPresentationUsecase(deps);
        const result = await usecase({
            ...props,
            presentation: ''
        });
        if(result.isLeft()){
            expect(result.value instanceof Result).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when saving fails', async () => {
        const usecase = makeEditPresentationUsecase({
            ...deps,
            save: RemoveOrSave.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })
})