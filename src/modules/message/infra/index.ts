import { Socket, Server } from 'socket.io';
import { Express } from 'express';
import { createServer } from 'http';
import { 
    makeJoinRoomController, 
    makeLoadMoreController, 
    makePostMessageController 
} from './socket';
import { listMessagesUsecase, postMessageUsecase } from './usecases';
import { JWTAuthentication } from '../../../shared/infra/JWT';


export function addSocket(app: Express){
    const http = createServer(app);
    const io = new Server(http);

    io.on('connection', (socket: Socket) => {
        makeJoinRoomController(
            socket, 
            listMessagesUsecase, 
            JWTAuthentication.verifyAndRetrievePayload
        );

        makeLoadMoreController(
            socket,
            listMessagesUsecase,
            JWTAuthentication.verifyAndRetrievePayload
        );

        makePostMessageController(
            io,
            socket,
            postMessageUsecase,
            JWTAuthentication.verifyAndRetrievePayload
        );
    });
}