import { AppErrors } from '../../../../core/logic';
import { FindById, RemoveOrSave } from '../../repositories/__mocks__/AdminWriteRepo';
import { makeDeleteAdminUsecase } from '../DeleteAdmin';
import { AdminErrors } from '../errors';


describe('Delete Admin Usecase', () => {
    const props = { adminId: 'an admin id' };
    const deps = {
        find: FindById.notNull,
        remove: RemoveOrSave.ok
    };
    
    it('should return ok result', async () => {
        const usecase = makeDeleteAdminUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return AdminNotFound if admin does not exist', async () => {
        const usecase = makeDeleteAdminUsecase({
            ...deps,
            find: FindById.null
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AdminErrors.AdminNotFound).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return UnexpectedError when fetching admin fails', async () => {
        const usecase = makeDeleteAdminUsecase({
            ...deps,
            find: FindById.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when removing admin fails', async () => {
        const usecase = makeDeleteAdminUsecase({
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