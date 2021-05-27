import { FindById, IsEmailUsed, RemoveOrSave } from "../../infra/repositories/__mocks__/DonatorRepo";
import { FindCardById, RetrieveByDonatorId } from "../../infra/repositories/__mocks__/WalletRepo";
import { RemoveCard } from "../RemoveCard";
import { DonatorErrors } from "../errors";
import { AppErrors } from "../../../../core/logic";


describe("Remove Card Usecse", () => {
    const cardId = "a valid id2";
    const donatorId = "a donator id";
    const donatorRepo = {
        findById: FindById.notNull,
        save: RemoveOrSave.ok,
        isEmailUsed: IsEmailUsed.no,
        remove: RemoveOrSave.ok
    };
    const walletRepo = {
        findCardById: FindCardById.notNull,
        retrieveByDonatorId: RetrieveByDonatorId.empty
    };

    afterEach(() => {
        donatorRepo.findById = FindById.notNull,
        walletRepo.findCardById = FindCardById.notNull
    })

    it("should return ok result", async () => {
        donatorRepo.findById = FindById.fullWallet;
        const usecase = new RemoveCard(donatorRepo, walletRepo);
        const res = await usecase.execute({ donatorId, cardId });
        if(res.isRight()){
            expect(res.value.success).toBe(true);
        } else {
            fail("should be right");
        }
    })

    it("should return ko result when card is not found", async () => {
        walletRepo.findCardById = FindCardById.null;
        const usecase = new RemoveCard(donatorRepo, walletRepo);
        const res = await usecase.execute({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof DonatorErrors.CardNotFound).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when retrieving card fails", async () => {
        walletRepo.findCardById = FindCardById.throw;
        const usecase = new RemoveCard(donatorRepo, walletRepo);
        const res = await usecase.execute({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when donator is not found", async () => {
        donatorRepo.findById = FindById.null;
        const usecase = new RemoveCard(donatorRepo, walletRepo);
        const res = await usecase.execute({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof DonatorErrors.DonatorNotFound).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when retrieving donator fails", async () => {
        donatorRepo.findById = FindById.throw;
        const usecase = new RemoveCard(donatorRepo, walletRepo);
        const res = await usecase.execute({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when removing a card not ownd by the donator", async () => {
        donatorRepo.findById = FindById.fullWallet;
        const usecase = new RemoveCard(donatorRepo, walletRepo);
        const res = await usecase.execute({ donatorId, cardId: "an invalid id" });
        if(res.isLeft()){
            expect(res.value instanceof DonatorErrors.CardNotFound).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when saving the donator fails", async () => {
        donatorRepo.findById = FindById.fullWallet;
        donatorRepo.save = RemoveOrSave.throw;
        const usecase = new RemoveCard(donatorRepo, walletRepo);
        const res = await usecase.execute({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left")
        }
    })
})