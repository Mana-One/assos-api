import { Socket } from "socket.io";
import { UseCase } from "../../../../core/domain";
import { AccessToken, Role } from "../../../../shared/domain";
import { Authentication } from '../../../../shared/services';
import * as ListMessages from '../../usecases/ListMessages';


export interface JoinRoomInput {
    token: AccessToken;
    roomId: string;
}

export function makeJoinRoomController(
    socket: Socket,
    usecase: UseCase<ListMessages.Input, Promise<ListMessages.Response>>,
    verifyToken: Authentication.VerifyAndRetrievePayload
){
    return socket.on('joinRoom', async (input: JoinRoomInput) => {
        const { token, roomId } = input;
        try {
            const sender = await verifyToken(token);
            if((sender.role === Role.MANAGER || 
                sender.role === Role.VOLUNTEER) && 
                sender.associationId !== roomId){
                socket.emit('error', 'Forbidden');
                return;
            }

            const result = await usecase({ roomId, offset: 0 });
            if(result.isRight()){
                socket.join(roomId);
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