import { AppErrors, Result } from "../../../../core/logic";
import { Donator } from "../../domain";
import { CreateDonator } from "../CreateDonator";
import { FindById, IsEmailUsed, RemoveOrSave } from "../../infra/repositories/__mocks__/DonatorRepo";
import { Register, RemoveDonator } from "../../infra/store/__mocks__/StoreService";
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
        const usecase = new CreateDonator({
            isEmailUsed: IsEmailUsed.no,
            findById: FindById.null,
            save: RemoveOrSave.ok,
            remove: RemoveOrSave.ok
        }, {
            register: Register.ok,
            removeDonator
        });

        const res = await usecase.execute(props);
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
        const usecase = new CreateDonator({
            isEmailUsed: IsEmailUsed.no,
            findById: FindById.null,
            save: RemoveOrSave.ok,
            remove: RemoveOrSave.ok
        }, {
            register: Register.ok,
            removeDonator
        });

        props.password = "azertyuiop";
        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when email is already used", async () => {
        const usecase = new CreateDonator({
            isEmailUsed: IsEmailUsed.yes,
            findById: FindById.null,
            save: RemoveOrSave.ok,
            remove: RemoveOrSave.ok
        }, {
            register: Register.ok,
            removeDonator
        });

        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof DonatorErrors.AccountAlreadyExists).toBe(true);
    })

    it("should return ko result when email check fails", async () => {
        const usecase = new CreateDonator({
            isEmailUsed: IsEmailUsed.throw,
            findById: FindById.null,
            save: RemoveOrSave.ok,
            remove: RemoveOrSave.ok
        }, {
            register: Register.ok,
            removeDonator
        });

        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when saving fails", async () => {
        const usecase = new CreateDonator({
            isEmailUsed: IsEmailUsed.no,
            findById: FindById.null,
            save: RemoveOrSave.throw,
            remove: RemoveOrSave.ok
        }, {
            register: Register.ok,
            removeDonator
        });

        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when registering to the store fails", async () => {
        const usecase = new CreateDonator({
            isEmailUsed: IsEmailUsed.no,
            findById: FindById.null,
            save: RemoveOrSave.throw,
            remove: RemoveOrSave.ok
        }, {
            register: Register.throw,
            removeDonator
        });

        const res = await usecase.execute(props);
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})