import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { User } from "../../domain";
import { UserRepo } from "../../infra/repositories";
import { IdentityErrors } from "../errors";

interface Input {
    userId: string;
}

type Response = Either<
    Result<any>,
    Result<void>
>;

export class DeleteUser implements UseCase<Input, Promise<Response>> {
    constructor(private userRepo: UserRepo){}
    
    async execute(request: Input): Promise<Response> {
        let user: User | null = null;
        try {
            user = await this.userRepo.findById(request.userId);
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

        if(user === null){
            return left(new IdentityErrors.UserNotFound());
        }     

        try {
            await this.userRepo.deleteUser(user); 
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
  
        return right(Result.ok<void>());
    }    
}