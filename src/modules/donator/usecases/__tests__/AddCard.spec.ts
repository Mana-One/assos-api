import { AppErrors, Result } from "../../../../core/logic";
import { makeAddCardUseCase } from "../AddCard";
import { FindById, RemoveOrSave } from "../../repositories/__mocks__/DonatorRepo";
import { DonatorErrors } from "../errors";

describe("Add Card Usecase", () => {
    const donatorId = "a valid id";
    const findById = FindById.notNull;
    const save = RemoveOrSave.ok;

    const props = {
        donatorId,
        last4: "1234",
        storeReference: "a store reference"
    };

    afterEach(() => {
        props.last4 = "1234";
        props.storeReference = "a store reference";
    })

    it("should return ok result", async () => {
        const usecase = makeAddCardUseCase({
            findById,
            save
        });
        const res = await usecase(props);
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when donator not found", async () => {
        const usecase = makeAddCardUseCase({
            findById: FindById.null,
            save
        });
        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof DonatorErrors.DonatorNotFound).toBe(true);
    })

    it("should return ko result when finding donator fails", async () => {
        const usecase = makeAddCardUseCase({
            findById: FindById.throw,
            save
        });
        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when wallet is full", async () => {
        const usecase = makeAddCardUseCase({
            findById: FindById.fullWallet,
            save
        });
        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof DonatorErrors.WalletIsFull).toBe(true);
    })

    it("should return ko result when last4 is invalid", async () => {
        const usecase = makeAddCardUseCase({
            findById,
            save
        });
        props.last4 = "zaer";
        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when storeReference is invalid", async () => {
        const usecase = makeAddCardUseCase({
            findById,
            save
        });
        props.storeReference = "";
        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when saving donator fails", async () => {
        const usecase = makeAddCardUseCase({
            findById,
            save: RemoveOrSave.throw
        });
        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})