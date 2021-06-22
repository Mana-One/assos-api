import { Request, Response } from "express";
import { AppConfig } from "../../../../config";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { Guard, getLimit, getOffset } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as ListRecurringDonations from "../../usecases/ListRecurringDonations";


export function makeListRecurringDonationsController(
    usecase: UseCase<ListRecurringDonations.Input, Promise<ListRecurringDonations.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.DONATOR){
            return ExpressController.forbidden(res);
        }

        const payerId = req.body.account?.id;
        const guard = Guard.againstNullOrUndefined({
            key: "payerId", value: payerId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const limit = getLimit(20, String(req.query.limit));
        const offset = getOffset(String(req.query.offset));

        const result = await usecase({ payerId, limit, offset });
        if(result.isRight()){
            const resSet = result.value.getValue();
            const dto = Object.freeze({
                total: resSet.total,
                previous: resSet.previousOffset === null ? 
                    null : 
                    `${AppConfig.API_DOMAIN}donation/recurring?limit=${limit}&offset=${offset - limit}`,
                next: resSet.nextOffset === null ? 
                    null : 
                    `${AppConfig.API_DOMAIN}donation/recurring?limit=${limit}&offset=${offset + limit}`,
                recurringDonations: resSet.data
            });
            
            return ExpressController.ok<any>(res, dto);
        }

        const error = result.value;
        return ExpressController.fail(res, error.getValue().message);
    }
}