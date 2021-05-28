import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UserPassword } from "../../../../shared/domain";
import { UserRepo } from "../../infra/repositories";
import { IdentityErrors } from "../errors";


interface Input {
    userId: string;
    newPassword: string;
    checkPassword: string;
    oldPassword: string;
}

type Response = Either<
    AppErrors.UnexpectedError |
    IdentityErrors.NewAndCheckPasswordNotMatching |
    IdentityErrors.UserNotFound |
    Result<any>,

    Result<void>
>;

export class ChangePassword implements UseCase<Input, Promise<Response>> {
    constructor(private userRepo: UserRepo){};

    async execute(request: Input): Promise<Response> {
        const newPasswordRes = UserPassword.createNotHashed(request.newPassword);
        const checkPasswordRes = UserPassword.createNotHashed(request.checkPassword);
        const oldPasswordRes = UserPassword.createNotHashed(request.oldPassword);
        const res = this.checkInputs(newPasswordRes, checkPasswordRes, oldPasswordRes);
        if(!res.success){
            return left(res);
        }

        const newPassword = newPasswordRes.getValue();
        const checkPassword = checkPasswordRes.getValue();
        const oldPassword = oldPasswordRes.getValue();
        if(!await newPassword.comparePassword(checkPassword.getValue())){
            return left(new IdentityErrors.NewAndCheckPasswordNotMatching());
        }

        return this.saveChanges(request.userId, newPassword, oldPassword);
    }

    private checkInputs(
        newPasswordResult: Result<UserPassword>,
        checkPasswordResult: Result<UserPassword>,
        oldPasswordResult: Result<UserPassword>
    ): Result<UserPassword> {

        return Result.combine([
            newPasswordResult,
            checkPasswordResult,
            oldPasswordResult
        ]);
    }

    private async saveChanges(
        userId: string, 
        newPassword: UserPassword, 
        oldPassword: UserPassword
    ): Promise<Response> {

        try {
            const user = await this.userRepo.findById(userId);
            if(user === null){
                return left(new IdentityErrors.UserNotFound());
            }

            if(!await user.comparePassword(oldPassword.getValue())){
                return left(new IdentityErrors.UserNotFound());
            }

            user.updatePassword(newPassword);
            await this.userRepo.save(user);
            return right(Result.ok<void>());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}