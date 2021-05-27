import { DeleteDonator } from "../DeleteDonator";
import { FindById, IsEmailUsed, RemoveOrSave } from "../../infra/repositories/__mocks__/DonatorRepo";
import { DonatorErrors } from "../errors";
import { AppErrors } from "../../../../core/logic";


describe("Delete Donator Usecase", () => {
    const props = {
        isEmailUsed: IsEmailUsed.no,
        findById: FindById.notNull,
        save: RemoveOrSave.ok,
        remove: RemoveOrSave.ok
    }

    afterEach(() => {
        props.findById = FindById.notNull,
        props.remove = RemoveOrSave.ok
    })

    it("should return ok result", async () => {
        const usecase = new DeleteDonator(props);
        const res = await usecase.execute({ donatorId: "a valid id" });
        if(res.isRight()){
            expect(res.value.success).toBe(true);
        } else {
            fail("should be right");
        }
    })

    it("should return ko result when donator is not found", async () => {
        props.findById = FindById.null;
        const usecase = new DeleteDonator(props);
        const res = await usecase.execute({ donatorId: "a valid id" });
        if(res.isLeft()){
            expect(res.value instanceof DonatorErrors.DonatorNotFound).toBe(true);
        } else {
            fail("should be left");
        }
    })

    it("should return ko result when donator search fails", async () => {
        props.findById = FindById.throw;
        const usecase = new DeleteDonator(props);
        const res = await usecase.execute({ donatorId: "a valid id" });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left");
        }
    })

    it("should return ko result when donator removal fails", async () => {
        props.remove =RemoveOrSave.throw;
        const usecase = new DeleteDonator(props);
        const res = await usecase.execute({ donatorId: "a valid id" });
        if(res.isLeft()){
            expect(res.value instanceof AppErrors.UnexpectedError).toBe(true);
        } else {
            fail("should be left");
        }
    })
})