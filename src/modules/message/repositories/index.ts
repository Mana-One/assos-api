import { Message } from '../domain';


export namespace MessageWriteRepo {
    export interface Save {
        (message: Message): Promise<void>;
    }
}