import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as RetrieveWallet from "../../usecases/RetrieveWallet";
import { WalletDto } from "../../mappers";


export function makeRetrieveWalletController(
    retrieveWalletUsecase: UseCase<RetrieveWallet.Input, Promise<RetrieveWallet.Response>>
){
    return async function(req: Request, res: Response){
        const donatorId = req.body.account?.id;
        const authGuard = Guard.againstNullOrUndefined({
            key: "donatorId", value: donatorId
        });
        if(!authGuard.success){
            return ExpressController.forbidden(res, authGuard.message);
        }

        const result = await retrieveWalletUsecase({ donatorId });
        if(result.isRight()){
            return ExpressController.ok<WalletDto>(res, result.value.getValue());
        }

        const error = result.value;
        switch(error.constructor){
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}