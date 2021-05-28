import { Request, Response } from "express";
import { ExpressController } from "../../../../core/infra";
import { AppErrors } from "../../../../core/logic";
import { IdentityErrors } from "../../usecases/errors";
import { ChangePassword } from "../../usecases/ChangePassword";


export class ChangePasswordController extends ExpressController {
    constructor(private usecase: ChangePassword){
        super();
    }

    async executeImpl(req: Request, res: Response){
        const { newPassword, checkPassword, oldPassword } = req.body;
        if(newPassword === undefined ||
            checkPassword === undefined ||
            oldPassword === undefined){
            return this.clientError(res);
        }

        const result = await this.usecase.execute({
            userId: req.body.account.id,
            newPassword,
            checkPassword,
            oldPassword
        });

        if(result.isRight()){
            return this.ok(res);
        }

        if(result.isLeft()){
            const error = result.value;
            switch(error.constructor){
                case AppErrors.UnexpectedError:
                    return this.fail(res, error.getValue().message);
                case IdentityErrors.NewAndCheckPasswordNotMatching:
                    return this.clientError(res, error.getValue().message);
                case IdentityErrors.UserNotFound:
                    return this.notFound(res, error.getValue().message);
                default:
                    return this.clientError(res);
            }
        }
    }
}
