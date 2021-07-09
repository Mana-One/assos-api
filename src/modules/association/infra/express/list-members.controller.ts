import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, getLimit, getOffset, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as ListMembers from "../../usecases/ListMembers";
import { AssociationErrors } from "../../usecases/errors";
import { AssociationDto } from "../../mappers";
import { AppConfig } from "../../../../config";


export function makeListMembersController(
    usecase: UseCase<ListMembers.Input, Promise<ListMembers.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER && 
            req.body.account?.role !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }

        const { associationId } = req.params;
        const guard = Guard.againstNullOrUndefined({
            key: 'associationId', value: associationId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        if(req.body.account?.role === Role.MANAGER && 
            req.body.account?.associationId !== associationId){
            return ExpressController.forbidden(res);
        }

        const limit = getLimit(20, String(req.query.limit));
        const offset = getOffset(String(req.query.offset));
        const role = String(req.query.role);

        const result = await usecase({ associationId, role, limit, offset });
        if(result.isRight()){
            const resSet = result.value.getValue();
            const dto = Object.freeze({
                total: resSet.total,
                previous: resSet.previousOffset === null ? 
                    null : 
                    getPreviousPageUrl(associationId, limit, offset, role),
                next: resSet.nextOffset === null ? 
                    null : 
                    getNextPageUrl(associationId, limit, offset, role),
                donations: resSet.data
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

function getPreviousPageUrl(associationId: string, limit: number, offset: number, role?: string): string {
    if(role === undefined){
        return `${AppConfig.API_DOMAIN}association/${associationId}/members?limit=${limit}&offset=${offset - limit}`
    }

    return `${AppConfig.API_DOMAIN}association/${associationId}/members?role=${role}&limit=${limit}&offset=${offset - limit}`
}

function getNextPageUrl(associationId: string, limit: number, offset: number, role?: string): string {
    if(role === undefined){
        return `${AppConfig.API_DOMAIN}association/${associationId}/members?limit=${limit}&offset=${offset + limit}`
    }

    return `${AppConfig.API_DOMAIN}association/${associationId}/members?role=${role}&limit=${limit}&offset=${offset + limit}`
}