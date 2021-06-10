import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as RetrieveDonator from "../../usecases/RetrieveDonator";
import { DonatorErrors } from "../../usecases/errors";
import { DonatorDto } from "../../mappers";


export function makeRetrieveDonatorController(
    retrieveDonatorUsecase: UseCase<RetrieveDonator.Input, Promise<RetrieveDonator.Response>>
){
    return async function(req: Request, res: Response){
        const donatorId = req.body.account?.donatorId;
        const authGuard = Guard.againstNullOrUndefined({
            key: "donatorId", value: donatorId
        });
        if(!authGuard.success){
            return ExpressController.forbidden(res, authGuard.message);
        }

        const result = await retrieveDonatorUsecase({ donatorId });
        if(result.isRight()){
            return ExpressController.ok<DonatorDto>(res, result.value.getValue());
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