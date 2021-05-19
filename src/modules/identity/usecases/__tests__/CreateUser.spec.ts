import { saveKo, saveOk, findByEmailNotNull, findByEmailNull } from "./__mocks__/UserRepo";
import { CreateUser } from "../CreateUser";

describe("Create User Usecase", () => {
    it("should return ok result", async () => {
        const usecase = new CreateUser({
            save: saveOk,
            findByEmail: findByEmailNull
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$",
            roleName: "volunteer"
        });
        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
    })

    it("should return ok result even without a rolename", async () => {
        const usecase = new CreateUser({
            save: saveOk,
            findByEmail: findByEmailNull
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
            save: saveOk,
            findByEmail: findByEmailNull
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
    })

    it("should return ko result when email is already used", async () => {
        const usecase = new CreateUser({
            save: saveOk,
            findByEmail: findByEmailNotNull
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
    })

    it("should return ko result when persistence has failed", async () => {
        const usecase = new CreateUser({
            save: saveKo,
            findByEmail: findByEmailNull
        });

        const res = await usecase.execute({
            firstName: "a name",
            lastName: "a name",
            email: "test@test.test",
            password: "azertyUIOP123$"
        });
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
    })
})