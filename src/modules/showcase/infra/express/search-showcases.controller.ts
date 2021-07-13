import { Request, Response } from "express";
import { AppConfig } from "../../../../config";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, getLimit, getOffset, Guard } from "../../../../core/logic";
import { ShowcaseListDto } from "../../domain";
import { ShowcaseErrors } from "../../usecases/errors";
import * as SearchShowcases from "../../usecases/SearchShowcases";


export function makeSearchShowcasesController(
    usecase: UseCase<SearchShowcases.Input, Promise<SearchShowcases.Response>>
){
    return async function(req: Request, res: Response){
        if(typeof req.query.input !== 'string'){
            return ExpressController.clientError(res, 'Invalid input');
        }

        const input = req.query.input;
        const limit = getLimit(20, String(req.query.limit));
        const offset = getOffset(String(req.query.offset));

        const result = await usecase({ input, limit, offset });
        if(result.isRight()){
            const resSet = result.value.getValue();
            const dto = Object.freeze({
                total: resSet.total,
                previous: resSet.previousOffset === null ? 
                    null : 
                    `${AppConfig.API_DOMAIN}showcases?input=${input}&limit=${limit}&offset=${offset - limit}`,
                next: resSet.nextOffset === null ? 
                    null : 
                    `${AppConfig.API_DOMAIN}showcases?input=${input}&limit=${limit}&offset=${offset + limit}`,
                showcases: resSet.data
            });
            
            return ExpressController.ok<any>(res, dto);
        }

        const error = result.value;
        switch(error.constructor){
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}