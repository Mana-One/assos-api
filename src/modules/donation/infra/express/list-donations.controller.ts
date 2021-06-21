import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard, getLimit, getOffset, Paginated } from "../../../../core/logic";
import { DonationDto } from "../../mappers";
import * as ListDonations from "../../usecases/ListDonations";


export function makeListDonationsController(
    usecase: UseCase<ListDonations.Input, Promise<ListDonations.Response>>
){
    return async function(req: Request, res: Response){
        const payerId = req.body.account?.id;
        const guard = Guard.againstNullOrUndefined({
            key: "payerId", value: payerId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const limit = getLimit(20, req.params.limit);
        const offset = getOffset(req.params.offset);

        const result = await usecase({ payerId, limit, offset });
        if(result.isRight()){
            return ExpressController.ok<Paginated<DonationDto>>(res, result.value.getValue());
        }

        const error = result.value;
        return ExpressController.fail(res, error.getValue().message);
    }
}