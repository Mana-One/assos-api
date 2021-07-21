import { makeCreateAdminUsecase } from "../usecases/CreateAdmin";
import { makeDeleteAdminUsecase } from "../usecases/DeleteAdmin";
import { SequelizeAdminWriteRepo } from "./repositories";


export const createAdminUsecase = makeCreateAdminUsecase({
    exists: SequelizeAdminWriteRepo.exists,
    save: SequelizeAdminWriteRepo.save
});

export const deleteAdminUsecase = makeDeleteAdminUsecase({
    find: SequelizeAdminWriteRepo.findById,
    remove: SequelizeAdminWriteRepo.remove
});