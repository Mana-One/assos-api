import { makeEditInfoUsecase } from '../EditInfo';
import { FindById, RemoveOrSave } from '../../repositories/__mocks__/AssociationRepo';
import { AssociationErrors } from '../errors';
import { AppErrors, Result } from '../../../../core/logic';


describe('Edit Presentation Usecase', () => {
    const props = {
        associationId: 'an association id',
        name: 'a new name',
        email: 'asso@yahoo2.com',
        bannerUrl: 'https://domain.com/image.png'
    };

    const deps = {
        findAssociation: FindById.notNull,
        save: RemoveOrSave.ok
    };

    it('should return ok result', async () => {
        const usecase = makeEditInfoUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true)
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ok result when passing some fields', async () => {
        const usecase = makeEditInfoUsecase(deps);
        const result = await usecase({
            associationId: props.associationId,
            name: props.name
        });
        if(result.isRight()){
            expect(result.value.success).toBe(true)
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return AssociationNotFound when association does not exist', async () => {
        const usecase = makeEditInfoUsecase({ 
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
        const usecase = makeEditInfoUsecase({ 
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

    it('should return ko result when passing an invalid email', async () => {
        const usecase = makeEditInfoUsecase(deps);
        const result = await usecase({
            associationId: props.associationId,
            email: '.assos@yahoo2.com'
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return ko result when passing an invalid name or bannerUrl', async () => {
        const usecase = makeEditInfoUsecase(deps);
        const result = await usecase({
            associationId: props.associationId,
            name: ''
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when saving fails', async () => {
        const usecase = makeEditInfoUsecase({ 
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