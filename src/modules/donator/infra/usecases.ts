import { makeCreateDonatorUseCase } from "../usecases/CreateDonator";
import { makeDeleteDonatorUseCase } from "../usecases/DeleteDonator";
import { makeListDonatorsUsecase } from "../usecases/ListDonators";
import { SequelizeDonatorReadRepo, SequelizeDonatorWriteRepo } from "./repositories";
import { StripeStoreService } from "./stripe";


export const createDonatorUsecase = makeCreateDonatorUseCase({
    isEmailUsed: SequelizeDonatorWriteRepo.isEmailUsed,
    register: StripeStoreService.register,
    save: SequelizeDonatorWriteRepo.save
});

export const deleteDonatorUseCase = makeDeleteDonatorUseCase({
    findById: SequelizeDonatorWriteRepo.findById,
    remove: SequelizeDonatorWriteRepo.remove
});

export const listDonatorsUsecase = makeListDonatorsUsecase({
    list: SequelizeDonatorReadRepo.listDonators
});