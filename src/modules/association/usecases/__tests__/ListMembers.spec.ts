import { makeListMembersUsecase } from '../ListMembers';
import { Role } from '../../../../shared/domain';
import { ListMembersByAssociation } from '../../repositories/__mocks__/MemberRepo';
import { AppErrors } from '../../../../core/logic';


describe('List Members Usecase', () => {
    const props = { 
        associationId: 'an association id',
        role: 'volunteer',
        limit: 20,
        offset: 0
    };
    const deps = { findMembers: ListMembersByAssociation.notEmpty };
    const expected = {
        id: 'a member id',
        firstName: "Paolo",
        lastName: "Manaois",
        email: "manager@yahoo.com",
        role: Role.MANAGER
    };

    it('should return ok result', async () => {
        const usecase = makeListMembersUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const paginatedDto = result.value.getValue();
            expect(paginatedDto.total).toBe(1);

            const dto = paginatedDto.data[0];
            expect(dto.id).toBe(expected.id);
            expect(dto.firstName).toBe(expected.firstName);
            expect(dto.lastName).toBe(expected.lastName);
            expect(dto.role).toBe(expected.role);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ok result even with empty result', async () => {
        const usecase = makeListMembersUsecase({
            findMembers: ListMembersByAssociation.empty
        });
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);

            const paginatedDto = result.value.getValue();
            expect(paginatedDto.total).toBe(0);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return ko result when passing an invalid role', async () => {
        const usecase = makeListMembersUsecase(deps);
        const result = await usecase({
            ...props,
            role: 'an invalid role'
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
        } else {
            fail('Result should be \'left\'');
        }
    })

    it('should return UnexpectedError when fetching members fails', async () => {
        const usecase = makeListMembersUsecase({
            findMembers: ListMembersByAssociation.throw
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