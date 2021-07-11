import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as DeleteMember from "../../usecases/DeleteMember";
import { AssociationErrors } from "../../usecases/errors";


export function makeDeleteMemberController(
    usecase: UseCase<DeleteMember.Input, Promise<DeleteMember.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER && 
            req.body.account?.role !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }

        const { associationId, memberId } = req.params;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'associationId', value: associationId },
            { key: 'memberId', value: memberId }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        if(req.body.account?.role === Role.MANAGER && 
            req.body.account?.associationId !== associationId){
            return ExpressController.forbidden(res);
        }

        const result = await usecase({ associationId, memberId });
        if(result.isRight()){
            return ExpressController.noContent(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AssociationErrors.MemberNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AssociationErrors.NeedAtLeastOneManager:
                return ExpressController.conflict(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}