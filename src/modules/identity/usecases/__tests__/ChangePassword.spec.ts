import { AppErrors, Result } from "../../../../core/logic";
import { Save, FindByEmail, FindById } from "../../infra/repositories/__mocks__/UserRepo";
import { ChangePassword } from "../ChangePassword.ts/UseCase";
import { IdentityErrors } from "../errors";


describe("Change Password Usecase", () => {
    const findByEmail = FindByEmail.null;

    it("should return ok result", async () => {
        const usecase = new ChangePassword({
            save: Save.ok,
            findById: FindById.ok,
            findByEmail
        });

        const res = await usecase.execute({
            userId: "an id",
            newPassword: "azertyUIOP234$",
            checkPassword: "azertyUIOP234$",
            oldPassword: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);
        expect(res.value.success).toBe(true);
        expect(() => res.value.getValue()).toThrowError("A value was not provided"); 
    })

    it("should return ko result when one of the passwords is invalid", async () => {
        const usecase = new ChangePassword({
            save: Save.ok,
            findById: FindById.ok,
            findByEmail
        });

        const res = await usecase.execute({
            userId: "an id",
            newPassword: "azertyUIOP234",
            checkPassword: "azertyUIOP234$",
            oldPassword: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true); 
        expect(res.value.success).toBe(false);
    })

    it("should return ko result when newPassword and checkPassword do not match", async () => {
        const usecase = new ChangePassword({
            save: Save.ok,
            findById: FindById.ok,
            findByEmail
        });

        const res = await usecase.execute({
            userId: "an id",
            newPassword: "azertyUIOP235$",
            checkPassword: "azertyUIOP234$",
            oldPassword: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.NewAndCheckPasswordNotMatching).toBe(true); 
    })

    it("should return ko result when user is not found", async () => {
        const usecase = new ChangePassword({
            save: Save.ok,
            findById: FindById.ko,
            findByEmail
        });

        const res = await usecase.execute({
            userId: "an id",
            newPassword: "azertyUIOP234$",
            checkPassword: "azertyUIOP234$",
            oldPassword: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.UserNotFound).toBe(true); 
    })

    it("should return ko result when fetching user by id fails", async () => {
        const usecase = new ChangePassword({
            save: Save.ok,
            findById: FindById.throw,
            findByEmail
        });

        const res = await usecase.execute({
            userId: "an id",
            newPassword: "azertyUIOP234$",
            checkPassword: "azertyUIOP234$",
            oldPassword: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true); 
    })

    it("should return ko result when oldPassword does not correspond to user's password", async () => {
        const usecase = new ChangePassword({
            save: Save.ok,
            findById: FindById.ok,
            findByEmail
        });

        const res = await usecase.execute({
            userId: "an id",
            newPassword: "azertyUIOP234$",
            checkPassword: "azertyUIOP234$",
            oldPassword: "azertyUIOP125$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.UserNotFound).toBe(true); 
    })

    it("should return ko result when persistence has failed", async () => {
        const usecase = new ChangePassword({
            save: Save.throw,
            findById: FindById.ok,
            findByEmail
        });

        const res = await usecase.execute({
            userId: "an id",
            newPassword: "azertyUIOP234$",
            checkPassword: "azertyUIOP234$",
            oldPassword: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true); 
    })
})