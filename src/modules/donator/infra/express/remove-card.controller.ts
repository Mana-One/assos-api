import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as RemoveCard from "../../usecases/RemoveCard";
import { DonatorErrors } from "../../usecases/errors";


export function makeRemoveCardController(
    removeCardUsecase: UseCase<RemoveCard.Input, Promise<RemoveCard.Response>>
){
    return async function(req: Request, res: Response){
        const donatorId = req.body.account?.donatorId;
        const authGuard = Guard.againstNullOrUndefined({
            key: "donatorId", value: donatorId
        });
        if(!authGuard.success){
            return ExpressController.forbidden(res, authGuard.message);
        }

        const { cardId } = req.params;
        const guard = Guard.againstNullOrUndefined(
            { key: "cardId", value: cardId }
        );
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await removeCardUsecase({ donatorId, cardId });
        if(result.isRight()){
            return ExpressController.noContent(res);
        }

        const error = result.value;
        switch(error.constructor){
            case DonatorErrors.CardNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}