import { 
    makeCreateDonatorController, 
    makeDeleteDonatorByAdminController, 
    makeDeleteDonatorController, 
    makeListDonatorsController 
} from "./express";
import { 
    createDonatorUsecase, 
    deleteDonatorUseCase, 
    listDonatorsUsecase 
} from "./usecases";


export const createDonatorController = makeCreateDonatorController(
    createDonatorUsecase
);

export const deleteDonatorByAdminController = makeDeleteDonatorByAdminController(
    deleteDonatorUseCase
);

export const deleteDonatorController = makeDeleteDonatorController(
    deleteDonatorUseCase
);

export const listDonatorsController = makeListDonatorsController(
    listDonatorsUsecase
)