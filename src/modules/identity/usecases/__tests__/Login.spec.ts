import { DeleteUser, FindByEmail, FindById } from "../../infra/repositories/__mocks__/UserRepo";
import { Login } from "../Login/UseCase";
import { CreateToken, VerifyAndRetrievePayload } from "../../services/__mocks__/Authentication";
import { Role } from "../../domain";
import { IdentityErrors } from "../errors";
import { AppErrors, Result } from "../../../../core/logic";

describe("Login Usecase", () => {
    const save = async () => {};
    const verifyAndRetrievePayload = VerifyAndRetrievePayload.ok
    const deleteUser = DeleteUser.ok;

    it("should return ok result", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.notNull,
            findById: FindById.ok,
            deleteUser
        }, {
            createToken: CreateToken.ok,
            verifyAndRetrievePayload
        });

        const res = await usecase.execute({
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
    })

    it("should return ko result when passing invalid values", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.notNull,
            findById: FindById.ok,
            deleteUser
        }, {
            createToken: CreateToken.ok,
            verifyAndRetrievePayload
        });

        const res = await usecase.execute({
            email: "test@test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when email not found", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.null,
            findById: FindById.ok,
            deleteUser
        }, {
            createToken: CreateToken.ok,
            verifyAndRetrievePayload
        });

        const res = await usecase.execute({
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.UserNotFound).toBe(true);
    })

    it("should return ko result when password does not match", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.notNull,
            findById: FindById.ok,
            deleteUser
        }, {
            createToken: CreateToken.ok,
            verifyAndRetrievePayload
        });

        const res = await usecase.execute({
            email: "test@test.test",
            password: "azertyUIOP000$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when token creation fails", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.notNull,
            findById: FindById.ok,
            deleteUser
        }, {
            createToken: CreateToken.throw,
            verifyAndRetrievePayload
        });

        const res = await usecase.execute({
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})