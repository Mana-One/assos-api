import { AppErrors, Result } from "../../../../core/logic";
import { FindByEmail, FindById, Save } from "../../repositories/__mocks__/UserRepo";
import { makeEditUserUseCase } from "../EditUser"; 
import { IdentityErrors } from "../errors";


describe("Edit User Usecase", () => {
    it("should return ok result", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            lastName: "lastname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);
        expect(res.value.success).toBe(true);
    })

    it("should return ok result when no updatabe fields is passed", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);
        expect(res.value.success).toBe(true);
    })

    it("should return ok result when some updatable fields are passed", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);
        expect(res.value.success).toBe(true);
    })

    it("should return ko result when passing an invalid id", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ko
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            lastName: "lastname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.UserNotFound).toBe(true);
    })

    it("should return ko result when fetching by id fails", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.throw
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            lastName: "lastname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when passing an invalid firstName", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id",
            firstName: "azertyuiopqsdfghjklmwxcvbn".repeat(4),
            lastName: "lastname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
        expect(res.value.success).toBe(false);
    })

    it("should return ko result when passing an invalid lastName", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            lastName: "",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
        expect(res.value.success).toBe(false);
    })

    it("should return ko result when passing an already used email", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.notNull,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            lastName: "lastname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.AccountAlreadyExists).toBe(true);
    })

    it("should return ko result when fetching by email fails", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.ok,
            findByEmail: FindByEmail.throw,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            lastName: "lastname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when saving fails", async () => {
        const usecase = makeEditUserUseCase({
            save: Save.throw,
            findByEmail: FindByEmail.null,
            findById: FindById.ok
        });

        const res = await usecase({
            userId: "an id",
            firstName: "firstname",
            lastName: "lastname",
            email: "test@test.test"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})