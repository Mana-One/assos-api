import { AppErrors, Result } from "../../../../core/logic";
import { makeListRecurringDonationsUsecase } from "../ListRecurringDonations";
import { ListRecurringByPayerId } from "../../repositories/__mocks__/DonationRepo";


describe("List Recurring Donations Usecase", () => {
    const payerId = "a payer id";
    const amount = 500.50;
    const currency = "EUR";
    const createdAt = new Date("2020-5-3");
    const recipientId = "a recipient id";
    const recipientName = "a recipient";

    it("should return ok result", async () => {
        const usecase = makeListRecurringDonationsUsecase({
            listRecurring: ListRecurringByPayerId.ok
        });

        const result = await usecase({ payerId, limit: 20, offset: 0 });
        if(result.isRight()){
            expect(result.value instanceof Result).toBe(true);
            expect(result.value.success).toBe(true);

            const paginated = result.value.getValue();
            expect(paginated.total).toBe(1);

            const data = paginated.data[0];
            expect(data.amount).toBe(amount);
            expect(data.currency).toBe(currency);
            expect(data.createAt.getTime()).toBe(createdAt.getTime());
            expect(data.recipient.id).toBe(recipientId);
            expect(data.recipient.name).toBe(recipientName);
            
        } else {
            fail("Result should be 'right'");
        }
    })

    it("should return UnexpectedError when listing recurring donations fails", async () => {
        const usecase = makeListRecurringDonationsUsecase({
            listRecurring: ListRecurringByPayerId.throw
        });

        const result = await usecase({ payerId, limit: 20, offset: 0 });
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);
            
        } else {
            fail("Result should be 'left'");
        }
    })
})