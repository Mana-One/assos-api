import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UserPassword } from "../../../../shared/domain";
import { UserRepo } from "../../repositories";
import { IdentityErrors } from "../errors";


export interface Input {
    userId: string;
    newPassword: string;
    checkPassword: string;
    oldPassword: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    IdentityErrors.NewAndCheckPasswordNotMatching |
    IdentityErrors.UserNotFound |
    Result<any>,

    Result<void>
>;

interface Props {
    findById: UserRepo.FindById;
    save: UserRepo.Save;
}

export function makeChangePasswordUseCase(props: Props): UseCase<Input, Promise<Response>> {
    return async function(request: Input): Promise<Response> {
        const newPasswordRes = UserPassword.createNotHashed(request.newPassword);
        const checkPasswordRes = UserPassword.createNotHashed(request.checkPassword);
        const oldPasswordRes = UserPassword.createNotHashed(request.oldPassword);
        const res = Result.combine([
            newPasswordRes,
            checkPasswordRes,
            oldPasswordRes
        ]);
        if(!res.success){
            return left(res);
        }

        const newPassword = newPasswordRes.getValue();
        const checkPassword = checkPasswordRes.getValue();
        const oldPassword = oldPasswordRes.getValue();
        if(!await newPassword.comparePassword(checkPassword.getValue())){
            return left(new IdentityErrors.NewAndCheckPasswordNotMatching());
        }

        return saveChanges(request.userId, newPassword, oldPassword, props);
    }
}

async function saveChanges(
    userId: string, 
    newPassword: UserPassword, 
    oldPassword: UserPassword,
    props: Props
): Promise<Response> {

    const { findById, save } = props;
    try {
        const user = await findById(userId);
        if(user === null){
            return left(new IdentityErrors.UserNotFound());
        }

        if(!await user.comparePassword(oldPassword.getValue())){
            return left(new IdentityErrors.UserNotFound());
        }

        user.updatePassword(newPassword);
        await save(user);
        return right(Result.ok<void>());

    } catch(err) {
        return left(new AppErrors.UnexpectedError(err));
    }
}