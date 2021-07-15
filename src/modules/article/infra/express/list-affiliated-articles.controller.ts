import { Request, Response } from "express";
import { AppConfig } from "../../../../config";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, getLimit, getOffset, Guard } from "../../../../core/logic";
import * as ListArticles from "../../usecases/ListArticles";


export function makeListArticlesController(
    usecase: UseCase<ListArticles.Input, Promise<ListArticles.Response>>
){
    return async function(req: Request, res: Response){
        const associationId = req.body.account?.associationId;
        const guard = Guard.againstNullOrUndefined({
            key: 'associationId', value: associationId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const limit = getLimit(20, String(req.query.limit));
        const offset = getOffset(String(req.query.offset));

        const result = await usecase({ associationId, limit, offset });
        if(result.isRight()){
            const resSet = result.value.getValue();
            const dto = Object.freeze({
                total: resSet.total,
                previous: resSet.previousOffset === null ? 
                    null : 
                    getPreviousPageUrl(associationId, limit, offset),
                next: resSet.nextOffset === null ? 
                    null : 
                    getNextPageUrl(associationId, limit, offset),
                articles: resSet.data
            });
            
            return ExpressController.ok<any>(res, dto);
        }

        const error = result.value;
        switch(error.constructor){
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}

function getPreviousPageUrl(associationId: string, limit: number, offset: number): string {
    return `${AppConfig.API_DOMAIN}articles/affiliated?limit=${limit}&offset=${offset - limit}`;
}

function getNextPageUrl(associationId: string, limit: number, offset: number): string {
    return `${AppConfig.API_DOMAIN}articles/affiliated?limit=${limit}&offset=${offset + limit}`;
}