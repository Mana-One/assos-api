import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UseCase } from "../../../../core/domain";
import { Authentication } from "../../../../shared/services";
import { UserRepo } from "../../infra/repositories";
import { UserEmail, UserPassword } from "../../../../shared/domain";
import { IdentityErrors } from "../errors";
import { AccessToken } from "../../../../shared/domain";

interface Input {
    email: string,
    password: string
}

type Response = Either<
    AppErrors.UnexpectedError |
    IdentityErrors.UserNotFound |
    Result<any>,
    Result<AccessToken>
>;

export class Login implements UseCase<Input, Promise<Response>> {
    constructor(private userRepo: UserRepo, private authService: Authentication){}
    
    async execute(request: Input): Promise<Response> {
        const emailOrFail = UserEmail.create(request.email);
        const passwordOrFail = UserPassword.createNotHashed(request.password);
        const res = Result.combine([emailOrFail, passwordOrFail]);
        if(!res.success){
            return left(res);
        }

        const email = emailOrFail.getValue();
        const password = passwordOrFail.getValue();

        try {
            const user = await this.userRepo.findByEmail(email);
            if(user === null || !await user.comparePassword(password.getValue())){
                return left(new IdentityErrors.UserNotFound());
            }
            
            const token = await this.authService.createToken({
                id: user.getId().toString(),
                role: user.getRole()
            });
            
            return right(Result.ok<AccessToken>(token));

        } catch(err) {
            console.error(err)
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}