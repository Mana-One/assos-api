import { AppErrors, Result } from "../../../../core/logic";
import { makeRetrieveWalletUseCase } from "../RetrieveWallet";
import { FindCardById, RetrieveByDonatorId } from "../../repositories/__mocks__/WalletRepo";



describe("Retrieve Wallet Usecase", () => {
    const donatorId = "a valid id";
    const findCardById = FindCardById.notNull;

    it("should return ok result", async () => {
        const usecase = makeRetrieveWalletUseCase({
            retrieveByDonatorId: RetrieveByDonatorId.notEmpty
        });

        const res = await usecase({ donatorId });
        if(res.isRight()){
            expect(res.value instanceof Result).toBe(true);

            const wallet = res.value.getValue();
            expect(wallet.cards.length > 0).toBe(true);
    
            const cardDto = wallet.cards[0];
            expect(cardDto.id).toBe("a valid id");
            expect(cardDto.last4).toBe("************1234");
            expect(cardDto.storeReference).toBe("a store reference");

        } else {
            fail("Result should be 'right'");
        }
    })

    it("should return ok result even with empty wallet", async () => {
        const usecase = makeRetrieveWalletUseCase({
            retrieveByDonatorId: RetrieveByDonatorId.empty
        });

        const res = await usecase({ donatorId });
        if(res.isRight()){
            expect(res.value instanceof Result).toBe(true);
            const wallet = res.value.getValue();
            expect(wallet.cards.length === 0).toBe(true);

        } else {
            fail("Result should be 'right'");
        }
    })

    it("should return ko result when fetching the wallet fails", async () => {
        const usecase = makeRetrieveWalletUseCase({
            retrieveByDonatorId: RetrieveByDonatorId.throw
        });

        const res = await usecase({ donatorId });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})