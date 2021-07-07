import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, getPaginated, left, Paginated, Result, right } from "../../../../core/logic";
import { isMemberRole, Role } from "../../../../shared/domain";
import { MemberDto, MemberMap } from "../../mappers";
import { MemberRepo } from "../../repositories";


export interface Input {
    associationId: string;
    role?: string;
    limit: number;
    offset: number;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    Result<any>,
    Result<Paginated<MemberDto>>
>;

interface Props {
    findMembers: MemberRepo.ListMembersByAsociation
}

export function makeListMembersUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findMembers } = props;

    return async function(request: Input): Promise<Response> {
        try {
            if(request.role !== undefined && !isMemberRole(request.role)){
                return left(Result.ko<Role>('Invalid role'));
            }

            const { total, members } = await findMembers(
                request.associationId, 
                request.limit, 
                request.offset, 
                request.role
            );
    
            const memberListDto = members.map(elm => MemberMap.toDto(elm));
            const paginated = getPaginated<MemberDto>(
                total, memberListDto, request.limit, request.offset
            );
    
            return right(Result.ok<Paginated<MemberDto>>(paginated)); 

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}