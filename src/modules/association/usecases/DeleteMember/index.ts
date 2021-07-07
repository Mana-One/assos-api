import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import { MemberRepo } from "../../repositories";
import { AssociationErrors } from "../errors";

export interface Input {
    memberId: string;
    associationId: string
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AssociationErrors.MemberNotFound |
    AssociationErrors.NeedAtLeastOneManager,

    Result<void>
>;

interface Props {
    findMember: MemberRepo.FindMember,
    countManagers: MemberRepo.CountManagers,
    removeMember: MemberRepo.Remove
}

export function makeDeleteMemberUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findMember, countManagers ,removeMember } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const member = await findMember(request.memberId, request.associationId);
            if(member === null){
                return left(new AssociationErrors.MemberNotFound());
            }
    
            if(member.getRole() === Role.MANAGER &&
                await countManagers(request.associationId) === 1){            
                return left(new AssociationErrors.NeedAtLeastOneManager());
            }
    
            await removeMember(member);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}