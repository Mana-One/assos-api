import { makeCreateMemberUsecase } from "../CreateMember";
import { FindById, IsEmailUsed } from "../../repositories/__mocks__/AssociationRepo";
import { Save } from "../../repositories/__mocks__/MemberRepo";
import { AssociationErrors } from "../errors";
import { AppErrors, Result } from "../../../../core/logic";


describe("Create Member Usecase", () => {
    const props = {
        associationId: "an association id",
        firstName: "Paolo",
        lastName: "Manaois",
        email: "manager@yahoo.com",
        password: "azertyUIOP123$",
        role: "volunteer"
    }

    const deps = {
        findAssociationById:FindById.notNull,
        isEmailUsed: IsEmailUsed.no,
        save: Save.ok
    }

    it("should return ok result", async () => {
        const usecase = makeCreateMemberUsecase(deps);
        const result = await usecase(props);
        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail("Result should be 'right'");
        }
    })

    it("should return AssociationNotFound when association does not exist", async () => {
        const usecase = makeCreateMemberUsecase({
            ...deps,
            findAssociationById: FindById.null
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AssociationErrors.AssociationNotFound).toBe(true);

        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when fetching association fails", async () => {
        const usecase = makeCreateMemberUsecase({
            ...deps,
            findAssociationById: FindById.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);

        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return ko result when passing invalid values", async () => {
        const usecase = makeCreateMemberUsecase(deps);
        const result = await usecase({
            ...props,
            role: "donator"
        });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof Result).toBe(true);

        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return AccountAlreadyExists when email is used", async () => {
        const usecase = makeCreateMemberUsecase({
            ...deps,
            isEmailUsed: IsEmailUsed.yes
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AssociationErrors.AccountAlreadyExists).toBe(true);

        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when checking email fails", async () => {
        const usecase = makeCreateMemberUsecase({
            ...deps,
            isEmailUsed: IsEmailUsed.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);

        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when saving member fails", async () => {
        const usecase = makeCreateMemberUsecase({
            ...deps,
            save: Save.throw
        });
        const result = await usecase(props);
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);

        } else {
            fail("Result should be 'left'");
        }
    })
})