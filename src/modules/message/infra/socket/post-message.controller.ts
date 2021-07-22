import { Socket, Server } from "socket.io";
import { UseCase } from "../../../../core/domain";
import { AppErrors } from "../../../../core/logic";
import { AccessToken, Role } from "../../../../shared/domain";
import { Authentication } from '../../../../shared/services';
import * as PostMessage from '../../usecases/PostMessage';


export interface PostMessageInput {
    token: AccessToken;
    roomId: string;
    content: string
}

export function makePostMessageController(
    io: Server,
    socket: Socket,
    usecase: UseCase<PostMessage.Input, Promise<PostMessage.Response>>,
    verifyToken: Authentication.VerifyAndRetrievePayload
){
    return socket.on('message', async (input: PostMessageInput) => {
        const { token, roomId, content } = input;
        try {
            const sender = await verifyToken(token);
            if((sender.role === Role.MANAGER || 
                sender.role === Role.VOLUNTEER) && 
                sender.associationId !== roomId){
                socket.emit('error', 'Forbidden');
                return;
            }

            const result = await usecase({ roomId, content, sender });
            if(result.isRight()){
                io.to(roomId).emit('message', {
                    sender,
                    content,
                    timestamp: new Date().getTime()
                });
                return;
            }

            const error = result.value;
            switch(error.constructor){
                case AppErrors.UnexpectedError:
                    socket.emit('error', error.getValue().message);
                    return;
                default:
                    socket.emit('error', error.getValue());
                    return;
            }
            

        } catch(err) {
            socket.emit('error', 'Forbidden');
        }
    });
}