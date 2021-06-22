import { Response } from "express";
import { UseCase } from "../../../../../core/domain";
import { ExpressController } from "../../../../../core/infra";
import { AppErrors, Guard } from "../../../../../core/logic";
import { isDonationType } from "../../../domain";
import { DonationErrors } from "../../../usecases/errors";
import * as SetUpRecurringDonation from "../../../usecases/SetUpRecurringDonation";


export function makeSetUpRecurringDonationController(
    usecase: UseCase<SetUpRecurringDonation.Input, Promise<SetUpRecurringDonation.Response>>
){
    return async function(payload: any, res: Response){
        const { amount, currency, payerId, recipientId, donationStoreReference } = payload;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: "amount", value: amount },
            { key: "currency", value: currency },
            { key: "payerId", value: payerId },
            { key: "recipientId", value: recipientId },
            { key: "donationStoreReference", value: donationStoreReference }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        if(isNaN(amount)){
            return ExpressController.clientError(res);
        }

        const result = await usecase({ 
            amount, 
            currency, 
            payerId, 
            recipientId, 
            donationStoreReference 
        });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case DonationErrors.PayerNotFound:
            case DonationErrors.RecipientNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue());
            default:
                return ExpressController.clientError(res, error.getValue().message);
        }
    }
}