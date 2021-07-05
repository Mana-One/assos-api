import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { isRole, Role, UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Member } from "../../domain";
import { AssociationRepo, MemberRepo } from "../../repositories";
import { AssociationErrors } from "../errors";


export interface Input {
    associationId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AssociationErrors.AssociationNotFound |
    AssociationErrors.AccountAlreadyExists |
    Result<any>,
    Result<void>
>;

interface Props {
    findAssociationById: AssociationRepo.FindById,
    isEmailUsed: AssociationRepo.IsMemberEmailUsed,
    save: MemberRepo.Save
}

export function makeCreateMemberUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findAssociationById, isEmailUsed, save } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const check = await findAssociationById(request.associationId);
            if(check === null){
                return left(new AssociationErrors.AssociationNotFound());
            }
    
            const emailRes = UserEmail.create(request.email);
            const firstNameRes = UserName.create(request.firstName);
            const lastNameRes = UserName.create(request.lastName);
            const passwordRes = UserPassword.createNotHashed(request.password);
            const result = Result.combine([
                emailRes, firstNameRes, lastNameRes, passwordRes
            ]);
            if(!result.success || !isRole(request.role)){
                return left(result);
            }
    
            const emailCheck = await isEmailUsed(emailRes.getValue());
            if(emailCheck){
                return left(new AssociationErrors.AccountAlreadyExists());
            }
    
            const memberRes = Member.create({
                firstName: firstNameRes.getValue(),
                lastName: lastNameRes.getValue(),
                email: emailRes.getValue(),
                password: passwordRes.getValue(),
                role: request.role,
                associationId: new UniqueId(request.associationId)
            });
            if(!memberRes.success){
                return left(memberRes);
            }
    
            await save(memberRes.getValue());
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}