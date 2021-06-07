import { FindById, RemoveOrSave } from "../../repositories/__mocks__/DonatorRepo";
import { FindCardById } from "../../repositories/__mocks__/WalletRepo";
import { makeRemoveCardUseCase } from "../RemoveCard";
import { DonatorErrors } from "../errors";
import { AppErrors } from "../../../../core/logic";


describe("Remove Card Usecse", () => {
    const cardId = "a valid id2";
    const donatorId = "a donator id";
    const props = {
        findById: FindById.notNull,
        findCardById: FindCardById.notNull,
        save: RemoveOrSave.ok
    };

    afterEach(() => {
        props.findById = FindById.notNull,
        props.findCardById = FindCardById.notNull
    })

    it("should return ok result", async () => {
        props.findById = FindById.fullWallet;
        const usecase = makeRemoveCardUseCase(props);
        const res = await usecase({ donatorId, cardId });
        if(res.isRight()){
            expect(res.value.success).toBe(true);
        } else {
            fail("should be right");
        }
    })

    it("should return ko result when card is not found", async () => {
        props.findCardById = FindCardById.null;
        const usecase = makeRemoveCardUseCase(props);
        const res = await usecase({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof DonatorErrors.CardNotFound).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when retrieving card fails", async () => {
        props.findCardById = FindCardById.throw;
        const usecase = makeRemoveCardUseCase(props);
        const res = await usecase({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when donator is not found", async () => {
        props.findById = FindById.null;
        const usecase = makeRemoveCardUseCase(props);
        const res = await usecase({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof DonatorErrors.DonatorNotFound).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when retrieving donator fails", async () => {
        props.findById = FindById.throw;
        const usecase = makeRemoveCardUseCase(props);
        const res = await usecase({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when removing a card not ownd by the donator", async () => {
        props.findById = FindById.fullWallet;
        const usecase = makeRemoveCardUseCase(props);
        const res = await usecase({ donatorId, cardId: "an invalid id" });
        if(res.isLeft()){
            expect(res.value instanceof DonatorErrors.CardNotFound).toBe(true);
        } else {
            fail("should be left")
        }
    })

    it("should return ko result when saving the donator fails", async () => {
        props.findById = FindById.fullWallet;
        props.save = RemoveOrSave.throw;
        const usecase = makeRemoveCardUseCase(props);
        const res = await usecase({ donatorId, cardId });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left")
        }
    })
})