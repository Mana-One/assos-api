import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { AssociationDto, AssociationMap } from "../../mappers";
import { AssociationRepo } from "../../repositories";
import { AssociationErrors } from "../errors";


export interface Input {
    associationId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AssociationErrors.AssociationNotFound,

    Result<AssociationDto>
>;

interface Props {
    findAssociation: AssociationRepo.FindById
}

export function makeGetAssociationUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findAssociation } = props;
 
    return async function(request: Input): Promise<Response> {
        try {
            const association = await findAssociation(request.associationId);
            if(association === null){
                return left(new AssociationErrors.AssociationNotFound());
            }
    
            const dto = AssociationMap.toDto(association);
            return right(Result.ok<AssociationDto>(dto));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}