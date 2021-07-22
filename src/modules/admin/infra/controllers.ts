import { makeCreateAdminController, makeDeleteAdminController } from "./express";
import { createAdminUsecase, deleteAdminUsecase } from "./usecases";


export const createAdminController = makeCreateAdminController(
    createAdminUsecase
);

export const deleteAdminController = makeDeleteAdminController(
    deleteAdminUsecase
);