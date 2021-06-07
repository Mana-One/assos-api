import { FindByEmail, FindById } from "../../repositories/__mocks__/UserRepo";
import { makeLoginUseCase } from "../Login";
import { CreateToken, VerifyAndRetrievePayload } from "../../../../shared/services/__mocks__/Authentication";
import { IdentityErrors } from "../errors";
import { AppErrors, Result } from "../../../../core/logic";

describe("Login Usecase", () => {
    const save = async () => {};
    const verifyAndRetrievePayload = VerifyAndRetrievePayload.ok;

    it("should return ok result", async () => {
        const usecase = makeLoginUseCase({
            findByEmail: FindByEmail.notNull,
            createToken: CreateToken.ok
        });

        const res = await usecase({
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
        expect(res.value instanceof Result).toBe(true);
        expect(res.value.success).toBe(true);
    })

    it("should return ko result when passing invalid values", async () => {
        const usecase = makeLoginUseCase({
            findByEmail: FindByEmail.notNull,
            createToken: CreateToken.ok
        });

        const res = await usecase({
            email: "test@test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);        
        expect(res.value.success).toBe(false);
    })

    it("should return ko result when email not found", async () => {
        const usecase = makeLoginUseCase({
            findByEmail: FindByEmail.null,
            createToken: CreateToken.ok
        });

        const res = await usecase({
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.UserNotFound).toBe(true);
    })

    it("should return ko result when password does not match", async () => {
        const usecase = makeLoginUseCase({
            findByEmail: FindByEmail.notNull,
            createToken: CreateToken.ok
        });

        const res = await usecase({
            email: "test@test.test",
            password: "azertyUIOP000$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof Result).toBe(true);
    })

    it("should return ko result when token creation fails", async () => {
        const usecase = makeLoginUseCase({
            findByEmail: FindByEmail.notNull,
            createToken: CreateToken.throw
        });

        const res = await usecase({
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})