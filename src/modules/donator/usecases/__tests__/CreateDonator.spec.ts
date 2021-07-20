import { AppErrors, Result } from "../../../../core/logic";
import { Donator } from "../../domain";
import { makeCreateDonatorUseCase } from "../CreateDonator";
import { IsEmailUsed, RemoveOrSave } from "../../repositories/__mocks__/DonatorWriteRepo";
import { Register, RemoveDonator } from "../../services/__mocks__/StoreService";
import { DonatorErrors } from "../errors";

describe("Create Donator Usecase", () => {
    const props = {
        firstName: "firstname",
        lastName: "lastname",
        email: "test@test.test",
        password: "azertyUIOP132$"
    };

    const removeDonator = RemoveDonator.ok;

    afterEach(() => {
        props.password = "azertyUIOP132$";
    })

    it("should return ok result", async () => {
        const usecase = makeCreateDonatorUseCase({
            isEmailUsed: IsEmailUsed.no,
            save: RemoveOrSave.ok,
            register: Register.ok
        });

        const res = await usecase(props);
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);

        const donator = res.value.getValue();
        expect(donator instanceof Donator).toBe(true);
        expect(donator.getId()).toBeTruthy();
        expect(donator.getFirstName().getValue()).toBe(props.firstName);
        expect(donator.getLastName().getValue()).toBe(props.lastName);
        expect(donator.getEmail().getValue()).toBe(props.email);
    })

    it("should return ko result when one of the value object creation fails", async () => {
        const usecase = makeCreateDonatorUseCase({
            isEmailUsed: IsEmailUsed.no,
            save: RemoveOrSave.ok,
            register: Register.ok
        });

        props.password = "azertyuiop";
        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when email is already used", async () => {
        const usecase = makeCreateDonatorUseCase({
            isEmailUsed: IsEmailUsed.yes,
            save: RemoveOrSave.ok,
            register: Register.ok
        });

        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof DonatorErrors.AccountAlreadyExists).toBe(true);
    })

    it("should return ko result when email check fails", async () => {
        const usecase = makeCreateDonatorUseCase({
            isEmailUsed: IsEmailUsed.throw,
            save: RemoveOrSave.ok,
            register: Register.ok
        });

        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when saving fails", async () => {
        const usecase = makeCreateDonatorUseCase({
            isEmailUsed: IsEmailUsed.no,
            save: RemoveOrSave.throw,
            register: Register.ok
        });

        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when registering to the store fails", async () => {
        const usecase = makeCreateDonatorUseCase({
            isEmailUsed: IsEmailUsed.no,
            save: RemoveOrSave.throw,
            register: Register.throw
        });

        const res = await usecase(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})