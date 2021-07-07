import { makeDeleteMemberUsecase } from '../DeleteMember';
import { CountManagers, FindMember, RemoveOrSave } from '../../repositories/__mocks__/MemberRepo';
import { AssociationErrors } from '../errors';
import { AppErrors } from '../../../../core/logic';


describe('Delete Member Usecase', () => {
    const props = {
        associationId: 'an association id',
        memberId: 'a member id'
    };
    const deps = {
        countManagers: CountManagers.moreThanOne,
        findMember: FindMember.notNull,
        removeMember: RemoveOrSave.ok
    };

    it('should return ok result', async () => {
        const usecase = makeDeleteMemberUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return MemberNotFound when member does not exist', async () => {
        const usecase = makeDeleteMemberUsecase({
            ...deps,
            findMember: FindMember.null
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AssociationErrors.MemberNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when fetching member fails', async () => {
        const usecase = makeDeleteMemberUsecase({
            ...deps,
            findMember: FindMember.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return NeedAtLeastOneManager when removing the only manager of the association', async () => {
        const usecase = makeDeleteMemberUsecase({
            ...deps,
            countManagers: CountManagers.one
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AssociationErrors.NeedAtLeastOneManager).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectError when removing a manager and counting fails', async () => {
        const usecase = makeDeleteMemberUsecase({
            ...deps,
            countManagers: CountManagers.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectError when removing fails', async () => {
        const usecase = makeDeleteMemberUsecase({
            ...deps,
            removeMember: RemoveOrSave.throw
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