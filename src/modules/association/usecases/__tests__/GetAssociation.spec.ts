import { makeGetAssociationUsecase } from '../GetAssociation';
import { FindById } from '../../repositories/__mocks__/AssociationRepo';
import { AssociationErrors } from '../errors';
import { AppErrors } from '../../../../core/logic';
 

describe('Get Association Usecase', () => {
    const props = { associationId: 'an association id' };
    const deps = { findAssociation: FindById.notNull };
    const expected = {
        name: "associaiton name",
        email: "assos@yahoo.com",
        bannerUrl: "a banner url",
        presentation: "a presentation",
    }

    it('should return ok result', async () => {
        const usecase = makeGetAssociationUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
            const dto = result.value.getValue();
            expect(dto.id).toBe(props.associationId);
            expect(dto.name).toBe(expected.name);
            expect(dto.email).toBe(expected.email);
            expect(dto.bannerUrl).toBe(expected.bannerUrl);
            expect(dto.presentation).toBe(expected.presentation);

        } else {
            fail('Result should be \'right\'');
        }
    })

    it('should return AssociationNotFound when association does not exist', async () => {
        const usecase = makeGetAssociationUsecase({
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

    it('should return AssociationNotFound when feching association fails', async () => {
        const usecase = makeGetAssociationUsecase({
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
})