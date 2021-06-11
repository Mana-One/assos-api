import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as AddCard from "../../usecases/AddCard";
import { DonatorErrors } from "../../usecases/errors";


export function makeAddCardController(
    addCardUsecase: UseCase<AddCard.Input, Promise<AddCard.Response>>
){
    return async function(req: Request, res: Response){
        const donatorId = req.body.account?.id;
        const authGuard = Guard.againstNullOrUndefined({
            key: "donatorId", value: donatorId
        });
        if(!authGuard.success){
            return ExpressController.forbidden(res, authGuard.message);
        }

        const { last4, storeReference } = req.body;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: "last4", value: last4 },
            { key: "storeReference", value: storeReference }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await addCardUsecase({ donatorId, last4, storeReference });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case DonatorErrors.DonatorNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case DonatorErrors.WalletIsFull:
                return ExpressController.conflict(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}