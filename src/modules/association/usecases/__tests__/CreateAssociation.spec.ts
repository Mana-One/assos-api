import { makeCreateAssociationUsecase } from "../CreateAssociation";
import { RegisterMerchant } from "../../services/__mocks__/MerchantService";
import { CreateAssociation, IsEmailUsed } from "../../repositories/__mocks__/AssociationRepo";
import { AppErrors, Result } from "../../../../core/logic";
import { AssociationErrors } from "../errors";


describe("Create Association Usecase", () => {
    const props = {
        name: "associaiton name",
        email: "assos@yahoo.com",
        bannerUrl: "a banner url",
        presentation: "a presentation",
        manager: {
            firstName: "Paolo",
            lastName: "Manaois",
            email: "manager@yahoo.com",
            password: "azertyUIOP123$"
        }
    }

    const deps = {
        registerMerchant: RegisterMerchant.ok,
        isEmailUsed: IsEmailUsed.no,
        createAssociation: CreateAssociation.ok
    };

    it("should return ok result", async () => {
        const usecase = makeCreateAssociationUsecase(deps);
        const result = await usecase(props);

        if(result.isRight()){
            expect(result.value.success).toBe(true);
        } else {
            fail("Result should be 'right'")
        }
    })

    it("should return ko result when passing an invalid value object", async () => {
        const usecase = makeCreateAssociationUsecase(deps);
        const result = await usecase({
            ...props,
            email: ".assos@yahoo.com"
        });

        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof Result).toBe(true);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return AccountAlreadyExists when manager's email is already used", async () => {
        const usecase = makeCreateAssociationUsecase({
            ...deps,
            isEmailUsed: IsEmailUsed.yes
        });
        const result = await usecase(props);

        
        if(result.isLeft()){
            expect(result.value instanceof AssociationErrors.AccountAlreadyExists).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when checking manager's email fails", async () => {
        const usecase = makeCreateAssociationUsecase({ 
            ...deps, 
            isEmailUsed: IsEmailUsed.throw
        });
        const result = await usecase(props);

        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when registering merchant fails", async () => {
        const usecase = makeCreateAssociationUsecase({ 
            ...deps, 
            registerMerchant: RegisterMerchant.throw 
        });
        const result = await usecase(props);

        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when creating asociation fails", async () => {
        const usecase = makeCreateAssociationUsecase({ 
            ...deps, 
            registerMerchant: RegisterMerchant.throw 
        });
        const result = await usecase(props);

        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })
})