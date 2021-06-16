import { AppErrors, Result } from "../../../../core/logic";
import { makeCancelRecurringDonationUsecase } from "../CancelRecurringDonation";
import { CancelRecurringPayment } from "../../services/__mocks__/PaymentService";
import { FindById as FindPayerById } from "../../repositories/__mocks__/PayerRepo";
import { FindById as FindRecipientById } from "../../repositories/__mocks__/RecipientRepo";
import { FindRecurring, RemoveRecurring } from "../../repositories/__mocks__/DonationRepo";
import { DonationErrors } from "../errors";


describe("Cancel Recurring Donation Usecase", () => {
    const request = {
        payerId: "a valid payer id",
        recipientId: "a valid recipient id"
    };

    it("should return ok result", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            findRecurringDonation: FindRecurring.notNull,
            removeRecurringDonation: RemoveRecurring.ok
        });
        
        const result = await usecase(request);
        if(result.isRight()){
            expect(result.value instanceof Result).toBe(true);
            expect(result.value.success).toBe(true);
        } else {
            fail("Result should be 'right'");
        }
    })

    it("should return PayerNotFound when payer does not exist", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.null,
            findRecipientById: FindRecipientById.notNull,
            findRecurringDonation: FindRecurring.notNull,
            removeRecurringDonation: RemoveRecurring.ok
        });
        
        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof DonationErrors.PayerNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when fetching payer fails", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.throw,
            findRecipientById: FindRecipientById.notNull,
            findRecurringDonation: FindRecurring.notNull,
            removeRecurringDonation: RemoveRecurring.ok
        });
        
        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return RecipientNotFound when recipient does not exist", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.null,
            findRecurringDonation: FindRecurring.notNull,
            removeRecurringDonation: RemoveRecurring.ok
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
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.throw,
            findRecurringDonation: FindRecurring.notNull,
            removeRecurringDonation: RemoveRecurring.ok
        });
        
        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return RecurringdonationNotFound when recuring donation does not exist", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            findRecurringDonation: FindRecurring.null,
            removeRecurringDonation: RemoveRecurring.ok
        });
        
        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof DonationErrors.RecurringDonationNotFound).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when fetching recuring donation fails", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            findRecurringDonation: FindRecurring.throw,
            removeRecurringDonation: RemoveRecurring.ok
        });
        
        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when recurring payment cancellation fails", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.throw,
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            findRecurringDonation: FindRecurring.notNull,
            removeRecurringDonation: RemoveRecurring.ok
        });
        
        const result = await usecase(request);
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpectedError when removing recurring donation fails", async () => {
        const usecase = makeCancelRecurringDonationUsecase({
            cancelRecurringPayment: CancelRecurringPayment.ok,
            findPayerById: FindPayerById.notNull,
            findRecipientById: FindRecipientById.notNull,
            findRecurringDonation: FindRecurring.notNull,
            removeRecurringDonation: RemoveRecurring.throw
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