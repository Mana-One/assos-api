import { AppErrors } from '../../../../core/logic';
import { Exists, RemoveOrSave } from '../../repositories/__mocks__/AdminWriteRepo';
import { makeCreateAdminUsecase } from '../CreateAdmin';
import { AdminErrors } from '../errors';


describe('Create Admin Usecase', () => {
    const props = {
        firstName: 'a firstname',
        lastName: 'a lastname',
        email: 'username@yahoo.com',
        password: 'azertyUIOP123$'
    };
    const deps = {
        exists: Exists.no,
        save: RemoveOrSave.ok
    };

    it('should return ok result', async () => {
        const usecase = makeCreateAdminUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ko result when passing an invalid value', async () => {        
        const usecase = makeCreateAdminUsecase(deps);
        const result = await usecase({
            ...props,
            password: 'azertyUIOP$'
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return AccountAlreadyExists when email is already used', async () => {        
        const usecase = makeCreateAdminUsecase({ ...deps, exists: Exists.yes });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AdminErrors.AccountAlreadyExists).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when existence check fails', async () => {        
        const usecase = makeCreateAdminUsecase({ ...deps, exists: Exists.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when saving fails', async () => {        
        const usecase = makeCreateAdminUsecase({ ...deps, save: RemoveOrSave.throw });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })
})