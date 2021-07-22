import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { AdminWriteRepo } from "../../repositories";
import { AdminErrors } from "../errors";


export interface Input {
    adminId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AdminErrors.AdminNotFound,

    Result<void>
>

interface Dependencies {
    find: AdminWriteRepo.FindById,
    remove: AdminWriteRepo.Remove
}

export function makeDeleteAdminUsecase(dependencies: Dependencies): UseCase<Input, Promise<Response>> {
    const { find, remove } = dependencies;

    return async function(request: Input): Promise<Response> {
        try {
            const admin = await find(request.adminId);
            if(admin.isNone()){
                return left(new AdminErrors.AdminNotFound());
            }
    
            await remove(admin.getValue());
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}