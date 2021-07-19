import { Socket, Server } from 'socket.io';
import { Server as HttpServer, createServer } from 'http';
import { 
    makeJoinRoomController, 
    makeLoadMoreController, 
    makePostMessageController 
} from './socket';
import { listMessagesUsecase, postMessageUsecase } from './usecases';
import { JWTAuthentication } from '../../../shared/infra/JWT';


export function addSocket(server: HttpServer){
    const io = new Server(server, {
        cors: { origin: true }
    });

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