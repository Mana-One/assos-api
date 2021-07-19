import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { isRole } from "../../../../shared/domain";
import { Message, Sender } from "../../domain";
import { MessageWriteRepo } from "../../repositories";


export interface Input {
    sender: {
        id: string;
        username: string;
        role: string;
    };
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
        if(!isRole(request.sender.role)){
            return left(Result.ko<any>('Invalid role'));
        }

        const senderRes = Sender.create({
            username: request.sender.username,
            role: request.sender.role
        }, new UniqueId(request.sender.id));
        if(!senderRes.success){
            return left(senderRes);
        }


        const res = Message.create({
            roomId: new UniqueId(request.roomId),
            content: request.content,
            publicationDate: new Date(),
            sender: senderRes.getValue()
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