import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { Role, RoleName, User, UserEmail, UserName, UserPassword } from "../../domain";
import { UserRepo } from "../../infra/repositories";
import { IdentityErrors } from "../errors";

interface Input {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName?: string;
}

type Response = Either<
    IdentityErrors.AccountAlreadyExists |
    Result<any>,
    Result<void>
>;

export class CreateUser implements UseCase<Input, Promise<Response>> {
    constructor(private userRepo: UserRepo){}
    
    async execute(request: Input): Promise<Response> {
        const role = Role.create(request.roleName ? request.roleName : RoleName.DONATOR);
        const firstName = UserName.create(request.firstName);
        const lastName = UserName.create(request.lastName);
        const email = UserEmail.create(request.email);
        const password = UserPassword.createHashed(request.password);
        const res = Result.combine([role, firstName, lastName, email, password]);
        if(!res.success){
            return left(Result.ko(res.getValue()));
        }

        const userRes = User.create({
            firstName: firstName.getValue(),
            lastName: lastName.getValue(),
            email: email.getValue(),
            password: password.getValue(),
            role: role.getValue()
        });

        const user = userRes.getValue();
        const check = await this.userRepo.findByEmail(user.getEmail());
        if(check != null){
            const email = user.getEmail().getValue();
            return left(new IdentityErrors.AccountAlreadyExists(email))
        }

        try {
            await this.userRepo.save(user);
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

        return right(Result.ok());
    }    
}
