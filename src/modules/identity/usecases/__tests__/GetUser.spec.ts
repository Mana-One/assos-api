import { makeGetUserUseCase } from "../GetUser";
import { FindById } from "../../repositories/__mocks__/UserRepo";
import { AppErrors, Result } from "../../../../core/logic";
import { IdentityErrors } from "../errors";


describe("Get User Usecase", () => {
    it("should return ok result", async () => {
        const expected = {
            id: "a valid id",
            firstName: "FirstName",
            lastName:"LastName",
            email: "test@test.test",
            role: "donator"
        };
        const usecase = makeGetUserUseCase({
            findById: FindById.ok
        });

        const result = await usecase({ userId: "a valid id" });
        if(result.isRight()){
            expect(result.value instanceof Result).toBe(true);
            expect(result.value.success).toBe(true);
            expect(result.value.getValue()).toEqual(expected);

        } else {
            fail("Result should be right");
        }
    })

    it("should return UserNotFoundError if user does not exist", async () => {
        const usecase = makeGetUserUseCase({
            findById: FindById.ko
        });

        const result = await usecase({ userId: "a valid id" });
        if(result.isLeft()){
            expect(result.value instanceof IdentityErrors.UserNotFound).toBe(true);
            expect(result.value.success).toBe(false);

        } else {
            fail("Result should be 'left'");
        }
    })

    it("should return UnexpecteddError if fetching by id fails", async () => {
        const usecase = makeGetUserUseCase({
            findById: FindById.throw
        });

        const result = await usecase({ userId: "a valid id" });
        if(result.isLeft()){
            expect(result.value instanceof AppErrors.UnexpectedError).toBe(true);
            expect(result.value.success).toBe(false);

        } else {
            fail("Result should be 'left'");
        }
    })
})