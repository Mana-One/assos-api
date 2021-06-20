import { AppErrors, Result } from "../../../../core/logic";
import { makeSetUpRecurringDonationUsecase } from "../SetUpRecurringDonation";
import { FindById as FindPayerById } from "../../repositories/__mocks__/PayerRepo";
import { FindById as FindRecipientById } from "../../repositories/__mocks__/RecipientRepo";
import { SetUpRecurring } from "../../repositories/__mocks__/DonationRepo";
import { DonationErrors } from "../errors";


describe("Set Up Recurring Donation Usecase", () => {
    const request = {
        amount: 500.50,
        currency: "eur",
        payerId: "a payer id",
        recipientId: "a recipient id",
        donationStoreReference: "a donation store reference"
    };

    it("should return ok result", async () => {
        const usecase = makeSetUpRecurringDonationUsecase({
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            setUpRecurringDonation: SetUpRecurring.ok
        });

        const result = await usecase(request);
        if(result.isRight()){
            expect(result.value instanceof Result).toBe(true);
            expect(result.value.success).toBe(true);
        } else {
            fail("Result should be 'right'");
        }
    })

    it("should return ko result when passing an invalid amount", async () => {
        const usecase = makeSetUpRecurringDonationUsecase({
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            setUpRecurringDonation: SetUpRecurring.ok
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

    it("should return PayerNotFound if payer does not exist", async () => {
        const usecase = makeSetUpRecurringDonationUsecase({
            findPayerById: FindPayerById.null,
            findRecipientById: FindRecipientById.notNull,
            setUpRecurringDonation: SetUpRecurring.ok
        });

        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof DonationErrors.PayerNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError if payer retrieval fails", async () => {
        const usecase = makeSetUpRecurringDonationUsecase({
            findPayerById: FindPayerById.throw,
            findRecipientById: FindRecipientById.notNull,
            setUpRecurringDonation: SetUpRecurring.ok
        });

        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return RecipîentNotFound if recipient does not exist", async () => {
        const usecase = makeSetUpRecurringDonationUsecase({
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.null,
            setUpRecurringDonation: SetUpRecurring.ok
        });

        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof DonationErrors.RecipientNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError if recipient retrieval fails", async () => {
        const usecase = makeSetUpRecurringDonationUsecase({
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.throw,
            setUpRecurringDonation: SetUpRecurring.ok
        });

        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError if donation set up fails", async () => {
        const usecase = makeSetUpRecurringDonationUsecase({
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            setUpRecurringDonation: SetUpRecurring.throw
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