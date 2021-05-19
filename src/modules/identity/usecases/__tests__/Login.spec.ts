import { FindByEmail } from "../../infra/repositories/__mocks__/UserRepo";
import { Login } from "../Login/UseCase";
import { CreateToken } from "../../services/__mocks__/Authentication";
import { RoleName } from "../../domain";

describe("Login Usecase", () => {
    const save = async () => {};
    const verifyAndRetrievePayload = async (str: string) => {
        return {
            id: "id",
            role: RoleName.DONATOR
        };
    }

    it("should return ok result", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.notNull
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
            findByEmail: FindByEmail.notNull
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
    })

    it("should return ko result when email not found", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.null
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
    })

    it("should return ko result when password does not match", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.notNull
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
    })

    it("should return ko result when token creation fails", async () => {
        const usecase = new Login({
            save,
            findByEmail: FindByEmail.notNull
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
    })
})