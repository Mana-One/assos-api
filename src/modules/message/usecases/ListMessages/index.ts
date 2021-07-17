import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { MessageListDto } from "../../domain";
import { MessageReadRepo } from "../../repositories";

export interface Input {
    roomId: string;
    offset: number;
}

const DEFAULT_LIMIT = 20;

export type Response = Either<
    AppErrors.UnexpectedError,
    Result<MessageListDto>
>;

interface Dependencies {
    listMessages: MessageReadRepo.ListByRoom
}

export function makeListMessagesUsecase(dependencies: Dependencies): UseCase<Input, Promise<Response>> {
    const { listMessages } = dependencies;

    return async function(request: Input): Promise<Response> {
        try {
            const messages = await listMessages(request.roomId, DEFAULT_LIMIT, request.offset);
            return right(Result.ok<MessageListDto>(messages));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}