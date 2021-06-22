import { Request, Response } from "express";
import { AppConfig } from "../../../../config";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { Guard, getLimit, getOffset } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as ListReceivedDonations from "../../usecases/ListReceivedDonations";


export function makeListReceivedDonationsController(
    usecase: UseCase<ListReceivedDonations.Input, Promise<ListReceivedDonations.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER){
            return ExpressController.forbidden(res);
        }

        const recipientId = req.body.account?.associationId;
        const guard = Guard.againstNullOrUndefined({
            key: "recipientId", value: recipientId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const limit = getLimit(20, String(req.query.limit));
        const offset = getOffset(String(req.query.offset));

        const result = await usecase({ recipientId, limit, offset });
        if(result.isRight()){
            const resSet = result.value.getValue();
            const dto = Object.freeze({
                total: resSet.total,
                previous: resSet.previousOffset === null ? 
                    null : 
                    `${AppConfig.API_DOMAIN}donation/received?limit=${limit}&offset=${offset - limit}`,
                next: resSet.nextOffset === null ? 
                    null : 
                    `${AppConfig.API_DOMAIN}donation/received?limit=${limit}&offset=${offset + limit}`,
                donations: resSet.data
            });
            
            return ExpressController.ok<any>(res, dto);
        }

        const error = result.value;
        return ExpressController.fail(res, error.getValue().message);
    }
}