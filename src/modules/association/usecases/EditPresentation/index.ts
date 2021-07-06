import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { AssociationRepo } from "../../repositories";
import { AssociationErrors } from "../errors";

export interface Input {
    associationId: string;
    presentation: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AssociationErrors.AssociationNotFound |
    Result<any>,

    Result<void>
>;

interface Props {
    findAssociation: AssociationRepo.FindById,
    save: AssociationRepo.Save
}

export function makeEditPresentationUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findAssociation, save } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const association = await findAssociation(request.associationId);
            if(association === null){
                return left(new AssociationErrors.AssociationNotFound());
            }
    
            const result = association.editPresentation(request.presentation);
            if(!result.success){
                return left(result);
            }
    
            await save(association);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}