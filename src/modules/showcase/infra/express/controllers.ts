import { makeGetShowcaseController } from "./get-showcase.controller";
import { makeSearchShowcasesController } from "./search-showcases.controller";
import { getShowcaseUsecase, searchShowcasesUsecase } from "./usecases";


export const getShowcaseController = makeGetShowcaseController(
    getShowcaseUsecase
);

export const searchShowcasesController = makeSearchShowcasesController(
    searchShowcasesUsecase
);