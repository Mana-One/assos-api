import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as CancelRecurringDonation from "../../usecases/CancelRecurringDonation";
import { DonationErrors } from "../../usecases/errors";


export function makeCancelRecurringDonationController(
    usecase: UseCase<CancelRecurringDonation.Input, Promise<CancelRecurringDonation.Response>>
){
    return async function(req: Request, res: Response){
        const { recipientId } = req.body;
        const payerId = req.body.account?.id;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: "payerId", value: payerId },
            { key: "recipientId", value: recipientId }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ payerId, recipientId });
        if(result.isRight()){
            return ExpressController.noContent(res);
        }

        const error = result.value;
        switch(error.constructor){
            case DonationErrors.RecurringDonationNotFound:
            case DonationErrors.PayerNotFound:
            case DonationErrors.RecipientNotFound:
                return ExpressController.notFound(res, error.getValue().message);

            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}