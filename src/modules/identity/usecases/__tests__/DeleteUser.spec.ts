import { DeleteUser } from "../../usecases/DeleteUser";
import * as MockUserRepo from "../../infra/repositories/__mocks__/UserRepo";
import { IdentityErrors } from "../errors";
import { AppErrors } from "../../../../core/logic";

describe("Delete User Usecase", () => {
    const findByEmail = MockUserRepo.FindByEmail.null;
    const save = MockUserRepo.Save.ok;

    it("should return ok result", async () => {
        const usecase = new DeleteUser({
            findById: MockUserRepo.FindById.ok,
            deleteUser: MockUserRepo.DeleteUser.ok,
            findByEmail,
            save
        });
        const res = await usecase.execute({
            userId: "an id"
        });

        expect(res.isLeft()).toBe(false);
        expect(res.isRight()).toBe(true);
    })

    it("should return ko result if user is not found", async () => {
        const usecase = new DeleteUser({
            findById: MockUserRepo.FindById.ko,
            deleteUser: MockUserRepo.DeleteUser.ok,
            findByEmail,
            save
        });
        const res = await usecase.execute({
            userId: "an id"
        });

        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof IdentityErrors.UserNotFound).toBe(true);
    })

    it("should return ko result when fetching user by id fails", async () => {
        const usecase = new DeleteUser({
            findById: MockUserRepo.FindById.throw,
            deleteUser: MockUserRepo.DeleteUser.ok,
            findByEmail,
            save
        });
        const res = await usecase.execute({
            userId: "an id"
        });
        
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })

    it("should return ko result when user removal fails", async () => {
        const usecase = new DeleteUser({
            findById: MockUserRepo.FindById.ok,
            deleteUser: MockUserRepo.DeleteUser.throw,
            findByEmail,
            save
        });
        const res = await usecase.execute({
            userId: "an id"
        });
        
        expect(res.isLeft()).toBe(true);
        expect(res.isRight()).toBe(false);
        expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
    })
})