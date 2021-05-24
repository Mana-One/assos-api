import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { AssociationId, isRole, Role, User, UserEmail, UserName, UserPassword } from "../../domain";
import { UserRepo } from "../../infra/repositories";
import { IdentityErrors } from "../errors";

interface Input {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName?: string;
    associationId?: string;
}

type Response = Either<
    IdentityErrors.AccountAlreadyExists |
    IdentityErrors.InvalidRole |
    Result<any>,
    Result<void>
>;

export class CreateUser implements UseCase<Input, Promise<Response>> {
    constructor(private userRepo: UserRepo){}
    
    async execute(request: Input): Promise<Response> {
        const role = request.roleName ? request.roleName : Role.DONATOR;
        if(!isRole(role)){
            return left(new IdentityErrors.InvalidRole());
        }

        const associationId = request.associationId === undefined ? 
            null : 
            new AssociationId(request.associationId);
        
        const firstName = UserName.create(request.firstName);
        const lastName = UserName.create(request.lastName);
        const email = UserEmail.create(request.email);
        const password = UserPassword.createNotHashed(request.password);
        const res = Result.combine([firstName, lastName, email, password]);
        if(!res.success){
            return left(res);
        }

        const userRes = User.create({
            firstName: firstName.getValue(),
            lastName: lastName.getValue(),
            email: email.getValue(),
            password: password.getValue(),
            role,
            associationId
        });

        const user = userRes.getValue();
        try {
            const check = await this.userRepo.findByEmail(user.getEmail());
            if(check != null){
                const email = user.getEmail().getValue();
                return left(new IdentityErrors.AccountAlreadyExists(email))
            }

            await this.userRepo.save(user);
            
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

        return right(Result.ok());
    }    
}
