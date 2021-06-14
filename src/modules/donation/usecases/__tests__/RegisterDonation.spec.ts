import { AppErrors, Result } from "../../../../core/logic";
import { DonationType } from "../../domain";
import { makeRegisterDonationUsecase } from "../RegisterDonation";
import { Save } from "../../repositories/__mocks__/DonationRepo";
import { Exists } from "../../repositories/__mocks__/RecipientRepo";
import { DonationErrors } from "../errors";


describe("Register Donation Usecase", () => {
    const request = {
        amount: 50.00,
        currency: "eur",
        type: DonationType.SINGLE,
        donatorId: "a donator Id",
        recipientId: "a recipient id"
    };

    it("should return ok result", async () => {
        const usecase = makeRegisterDonationUsecase({
            recipientExists: Exists.yes,
            save: Save.ok
        });
        const result = await usecase(request);

        if(result.isRight()){
            expect(result.value instanceof Result).toBe(true);
            expect(result.value.success).toBe(true);
        } else {
             fail("Result should be 'right'");
        }
    })

    it("should return ko result if passing an invalid amount object", async () => {
        const usecase = makeRegisterDonationUsecase({
            recipientExists: Exists.yes,
            save: Save.ok
        });
        const result = await usecase({ ...request, amount: -50.50 });

        if(result.isLeft()){
            expect(result.value instanceof Result).toBe(true);
            expect(result.value.success).toBe(false);
            expect(result.value.getValue()).toBe("Invalid amount");
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return RecipientNotFound when recipient does not exist", async () => {
        const usecase = makeRegisterDonationUsecase({
            recipientExists: Exists.no,
            save: Save.ok
        });
        const result = await usecase(request);

        if(result.isLeft()){
            expect(result.value instanceof DonationErrors.RecipientNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when fetching recipient fails", async () => {
        const usecase = makeRegisterDonationUsecase({
            recipientExists: Exists.throw,
            save: Save.ok
        });
        const result = await usecase(request);

        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when saving donation fails", async () => {
        const usecase = makeRegisterDonationUsecase({
            recipientExists: Exists.throw,
            save: Save.ok
        });
        const result = await usecase(request);

        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })
})