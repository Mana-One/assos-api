import { UniqueId } from "../../../../core/domain";
import { AppErrors, Result } from "../../../../core/logic";
import { RetrieveWallet } from "../RetrieveWallet";
import { RetrieveByDonatorId } from "../../infra/repositories/__mocks__/WalletRepo";
import { WalletDto } from "../RetrieveWallet/RetrieveWalletResponse";


describe("Retrieve Wallet Usecase", () => {
    const donatorId = new UniqueId("a valid id");

    it("should return ok result", async () => {
        const usecase = new RetrieveWallet({
            retrieveByDonatorId: RetrieveByDonatorId.notEmpty
        });

        const res = await usecase.execute({ donatorId });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);

        const wallet = <WalletDto>res.value.getValue();
        expect(wallet.cards.length > 0).toBe(true);

        const cardDto = wallet.cards[0];
        expect(cardDto.id).toBe("a valid id");
        expect(cardDto.last4).toBe("************1234");
        expect(cardDto.storeReference).toBe("a store reference");
    })

    it("should return ok result even with empty wallet", async () => {
        const usecase = new RetrieveWallet({
            retrieveByDonatorId: RetrieveByDonatorId.empty
        });

        const res = await usecase.execute({ donatorId });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);

        const wallet = <WalletDto>res.value.getValue();
        expect(wallet.cards.length === 0).toBe(true);
    })

    it("should return ko result when fetching the wallet fails", async () => {
        const usecase = new RetrieveWallet({
            retrieveByDonatorId: RetrieveByDonatorId.throw
        });

        const res = await usecase.execute({ donatorId });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})