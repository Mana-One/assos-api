import { Message, MessageListDto } from '../domain';


export namespace MessageWriteRepo {
    export interface Save {
        (message: Message): Promise<void>;
    }
}

export namespace MessageReadRepo {
    export interface ListByRoom {
        (roomId: string, limit: number, offset: number): Promise<MessageListDto>;
    }
}