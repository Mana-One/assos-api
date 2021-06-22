import { Response } from "express";
import { UseCase } from "../../../../../core/domain";
import { ExpressController } from "../../../../../core/infra";
import { AppErrors, Guard } from "../../../../../core/logic";
import { isDonationType } from "../../../domain";
import { DonationErrors } from "../../../usecases/errors";
import * as RegisterDonation from "../../../usecases/RegisterDonation";


export function makeRegisterDonationController(
    usecase: UseCase<RegisterDonation.Input, Promise<RegisterDonation.Response>>
){
    return async function(payload: any, res: Response){
        const { amount, currency, type, payerId, recipientId } = payload;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: "amount", value: amount },
            { key: "currency", value: currency },
            { key: "type", value: type },
            { key: "payerId", value: payerId },
            { key: "recipientId", value: recipientId }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        if(isNaN(amount) || !isDonationType(type)){
            return ExpressController.clientError(res);
        }

        const result = await usecase({
            amount: Number.parseFloat(amount),
            currency,
            type,
            payerId,
            recipientId
        });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case DonationErrors.RecipientNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue());
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}