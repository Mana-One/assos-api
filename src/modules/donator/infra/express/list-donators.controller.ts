import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { getLimit, getOffset } from "../../../../core/logic";
import * as ListDonators from "../../usecases/ListDonators";
import { AppConfig } from "../../../../config";
import { Role } from "../../../../shared/domain";


export function makeListDonatorsController(
    createDonatorUsecase: UseCase<ListDonators.Input, Promise<ListDonators.Response>>
){
    return async function(req: Request, res: Response) {
        if(req.body.account?.role !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }
        
        const limit = getLimit(20, String(req.query.limit));
        const offset = getOffset(String(req.query.offset));

        const result = await createDonatorUsecase({ limit, offset });
        if(result.isRight()){
            const resSet = result.value.getValue();
            const dto = Object.freeze({
                total: resSet.total,
                previous: resSet.previousOffset === null ? 
                    null : 
                    getPreviousPageUrl(limit, offset),
                next: resSet.nextOffset === null ? 
                    null : 
                    getNextPageUrl(limit, offset),
                articles: resSet.data
            });
            
            return ExpressController.ok<any>(res, dto);
        }

        const error = result.value;
        return ExpressController.fail(res, error.getValue().message);
    }
}

function getPreviousPageUrl(limit: number, offset: number): string {
    return `${AppConfig.API_DOMAIN}donator?limit=${limit}&offset=${offset - limit}`;
}

function getNextPageUrl(limit: number, offset: number): string {
    return `${AppConfig.API_DOMAIN}donator?limit=${limit}&offset=${offset + limit}`;
}