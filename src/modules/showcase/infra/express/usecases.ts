import { makeGetShowcaseUsecase } from '../../usecases/GetShowcase';
import { makeSearchShowcasesUsecase } from '../../usecases/SearchShowcases';
import { SequelizeShowcaseRepo } from '../repositories';


export const getShowcaseUsecase = makeGetShowcaseUsecase({
    getShowcase: SequelizeShowcaseRepo.findById
});

export const searchShowcasesUsecase = makeSearchShowcasesUsecase({
    search: SequelizeShowcaseRepo.search
});