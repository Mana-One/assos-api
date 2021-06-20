import { makeListReceivedDonationsUsecase } from "../ListReceivedDonations";
import { ListByRecipientId } from "../../repositories/__mocks__/DonationRepo";
import { DonationType } from "../../domain";
import { AppErrors } from "../../../../core/logic";


describe("List Donations Usecase", () => {
    const payerId = "a payer id";
    const amount = 500.50;
    const currency = "EUR";
    const donationId = "a donation id";
    const donationType = DonationType.SINGLE;
    const recipientId = "a recipient id";
    const recipientName = "a recipient";

    it("should return ok result", async () => {
        const usecase = makeListReceivedDonationsUsecase({
            listDonations: ListByRecipientId.ok
        });

        const result = await usecase({ recipientId, limit: 20, offset: 0 });
        if(result.isRight()){
            expect(result.value.success).toBe(true);
            const paginatedDto = result.value.getValue();
            expect(paginatedDto.total).toBe(1);

            const dto = paginatedDto.data[0];
            expect(dto.id).toBe(donationId);
            expect(dto.amount).toBe(amount);
            expect(dto.currency).toBe(currency);
            expect(dto.type).toBe(donationType);
            expect(dto.recipient.id).toBe(recipientId);
            expect(dto.recipient.name).toBe(recipientName);

        } else {
            fail("Result should be 'right'");
        }
    })

    it("should return UnexpectedError when listing donations fails", async () => {
        const usecase = makeListReceivedDonationsUsecase({
            listDonations: ListByRecipientId.throw
        });

        const result = await usecase({ recipientId, limit: 20, offset: 0 });
        if(result.isLeft()){
            expect(result.value.success).toBe(false);
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);            

        } else {
            fail("Result should be 'left'");
        }
    })
})