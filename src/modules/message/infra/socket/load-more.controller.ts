import { Socket } from "socket.io";
import { UseCase } from "../../../../core/domain";
import { AccessToken, Role } from "../../../../shared/domain";
import { Authentication } from '../../../../shared/services';
import * as ListMessages from '../../usecases/ListMessages';


export interface LoadMoreInput {
    token: AccessToken;
    roomId: string;
    offset: number;
}

export function makeLoadMoreController(
    socket: Socket,
    usecase: UseCase<ListMessages.Input, Promise<ListMessages.Response>>,
    verifyToken: Authentication.VerifyAndRetrievePayload
){
    return socket.on('loadMore', async (input: LoadMoreInput) => {
        const { token, roomId, offset } = input;
        try {
            const sender = await verifyToken(token);
            if((sender.role === Role.MANAGER || 
                sender.role === Role.VOLUNTEER) && 
                sender.associationId !== roomId){
                socket.emit('error', 'Forbidden');
                return;
            }

            const result = await usecase({ roomId, offset });
            if(result.isRight()){
                socket.emit('messages', result.value.getValue());
                return;
            }

            const error = result.value;
            socket.emit('error', error.getValue().message);

        } catch(err) {
            socket.emit('error', 'Forbidden');
        }
    });
}