import { AppErrors, Result } from "../../../../core/logic";
import { Save, FindByEmail, FindById } from "../../infra/repositories/__mocks__/UserRepo";
import { CreateUser } from "../CreateUser";
import { IdentityErrors } from "../errors";

describe("Create User Usecase", () => {
    it("should return ok result", async () => {
        const usecase = new CreateUser({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$",
            roleName: "donator"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
    })

    it("should return ok result even without a rolename", async () => {
        const usecase = new CreateUser({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
    })

    it("should return ko result if one of the parameters is invalid", async () => {
        const usecase = new CreateUser({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$",
            roleName: "hey"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when email is already used", async () => {
        const usecase = new CreateUser({
            save: Save.ok,
            findByEmail: FindByEmail.notNull,
            findById: FindById.ok
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.AccountAlreadyExists).toBe(true);
    })

    it("should return ko result when search by email fails", async () => {
        const usecase = new CreateUser({
            save: Save.ok,
            findByEmail: FindByEmail.throw,
            findById: FindById.ok
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when persistence has failed", async () => {
        const usecase = new CreateUser({
            save: Save.throw,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})