import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { AssociationRepo } from "../../repositories";
import { AssociationErrors } from "../errors";


export interface Input {
    associationId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AssociationErrors.AssociationNotFound,

    Result<void>
>;

interface Props {
    findAssociation: AssociationRepo.FindById,
    removeAssociation: AssociationRepo.Remove
}

export function makeDeleteAssociationUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findAssociation, removeAssociation } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const association = await findAssociation(request.associationId);
            if(association === null){
                return left(new AssociationErrors.AssociationNotFound());
            }
    
            await removeAssociation(association);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}