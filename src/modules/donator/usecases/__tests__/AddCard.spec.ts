import { AppErrors, Result } from "../../../../core/logic";
import { AddCard } from "../AddCard";
import { FindById, IsEmailUsed, RemoveOrSave } from "../../infra/repositories/__mocks__/DonatorRepo";
import { DonatorErrors } from "../errors";

describe("Add Card Usecase", () => {
    const donatorId = "a valid id";
    const findById = FindById.notNull;
    const isEmailUsed = IsEmailUsed.no;
    const save = RemoveOrSave.ok;
    const remove = RemoveOrSave.ok;

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
        const usecase = new AddCard({
            findById,
            isEmailUsed,
            save,
            remove
        });
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when donator not found", async () => {
        const usecase = new AddCard({
            findById: FindById.null,
            isEmailUsed,
            save,
            remove
        });
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof DonatorErrors.DonatorNotFound).toBe(true);
    })

    it("should return ko result when finding donator fails", async () => {
        const usecase = new AddCard({
            findById: FindById.throw,
            isEmailUsed,
            save,
            remove
        });
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when wallet is full", async () => {
        const usecase = new AddCard({
            findById: FindById.fullWallet,
            isEmailUsed,
            save,
            remove
        });
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof DonatorErrors.WalletIsFull).toBe(true);
    })

    it("should return ko result when last4 is invalid", async () => {
        const usecase = new AddCard({
            findById,
            isEmailUsed,
            save,
            remove
        });
        props.last4 = "zaer";
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when storeReference is invalid", async () => {
        const usecase = new AddCard({
            findById,
            isEmailUsed,
            save,
            remove
        });
        props.storeReference = "";
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when saving donator fails", async () => {
        const usecase = new AddCard({
            findById,
            isEmailUsed,
            save: RemoveOrSave.throw,
            remove
        });
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})