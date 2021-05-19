import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UseCase } from "../../../../core/domain";
import { Authentication } from "../../services";
import { UserRepo } from "../../infra/repositories";
import { AccessToken, UserEmail, UserPassword } from "../../domain";

interface Input {
    email: string,
    password: string
}

type Response = Either<
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
            return left(Result.ko(res.getValue()));
        }

        const email = emailOrFail.getValue();
        const password = passwordOrFail.getValue();

        try {
            const user = await this.userRepo.findByEmail(email);
            if(user === null || !await user.comparePassword(password.getValue())){
                return left(Result.ko("Not found"));
            }
    
            const token = await this.authService.createToken({
                id: user.getId().toString(),
                role: user.getRole().getValue()
            });
            
            return right(Result.ok<AccessToken>(token));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}