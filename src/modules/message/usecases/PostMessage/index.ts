import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { Message } from "../../domain";
import { MessageWriteRepo } from "../../repositories";


export interface Input {
    senderId: string;
    roomId: string;
    content: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    Result<any>,

    Result<void>
>;

interface Dependencies {
    save: MessageWriteRepo.Save
}

export function makePostMessageUsecase(dependencies: Dependencies): UseCase<Input, Promise<Response>> {
    const { save } = dependencies;

    return async function(request: Input): Promise<Response> {
        const res = Message.create({
            senderId: new UniqueId(request.senderId),
            roomId: new UniqueId(request.roomId),
            content: request.content,
            publicationDate: new Date()
        });
        if(!res.success){
            return left(res);
        }

        try {
            const message = res.getValue();
            await save(message);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}