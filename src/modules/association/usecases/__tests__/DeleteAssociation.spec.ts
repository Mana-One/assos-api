import { makeDeleteAssociationUsecase } from '../DeleteAssociation';
import { FindById, RemoveOrSave } from '../../repositories/__mocks__/AssociationRepo';
import { AssociationErrors } from '../errors';
import { AppErrors } from '../../../../core/logic';


describe('Delete Association Usecase', () => {
    const props = { associationId: 'an association id' };
    const deps = {
        findAssociation: FindById.notNull,
        removeAssociation: RemoveOrSave.ok
    };

    it('should return ok result', async () => {
        const usecase = makeDeleteAssociationUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return AssociationNotFound when association does not exist', async () => {
        const usecase = makeDeleteAssociationUsecase({
            ...deps,
            findAssociation: FindById.null
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AssociationErrors.AssociationNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be\'left\'');
        }
    })

    it('should return UnexpectedError when fetching association fails', async () => {
        const usecase = makeDeleteAssociationUsecase({
            ...deps,
            findAssociation: FindById.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be\'left\'');
        }
    })

    it('should return UnexpectedError when fetching association fails', async () => {
        const usecase = makeDeleteAssociationUsecase({
            ...deps,
            removeAssociation: RemoveOrSave.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be\'left\'');
        }
    })
})