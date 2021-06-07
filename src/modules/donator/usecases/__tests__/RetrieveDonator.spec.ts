import { AppErrors, Result } from "../../../../core/logic";
import { makeRetrieveDonatorUseCase } from "../RetrieveDonator";
import { IsEmailUsed, FindById, RemoveOrSave } from "../../repositories/__mocks__/DonatorRepo";
import { DonatorErrors } from "../errors";

describe("Retrieve Donator Usecase", () => {
    const donatorId = "a unique id";
    const isEmailUsed = IsEmailUsed.no;
    const save = RemoveOrSave.ok;
    const remove = RemoveOrSave.ok;

    it("should return ok result", async () => {
        const usecase = makeRetrieveDonatorUseCase({
            findById: FindById.notNull
        });
        const res = await usecase({ donatorId });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);

        const donatorDto = res.value.getValue();
        expect(donatorDto.firstName).toBe("Paolo");
        expect(donatorDto.lastName).toBe("Manaois");
        expect(donatorDto.email).toBe("username@yahoo.com");
    })

    it("should return ko result when no donator is found", async () => {
        const usecase = makeRetrieveDonatorUseCase({
            findById: FindById.null
        });
        const res = await usecase({ donatorId });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof DonatorErrors.DonatorNotFound).toBe(true);
    })

    it("should return ko result when finding by id fails", async () => {
        const usecase = makeRetrieveDonatorUseCase({
            findById: FindById.throw
        });
        const res = await usecase({ donatorId });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})