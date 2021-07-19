import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { Sender } from "./Sender";


interface MessageProps {
    roomId: UniqueId;
    content: string;
    publicationDate: Date;
    sender: Sender
}

export class Message extends Entity<MessageProps> {
    getId(): UniqueId {
        return this._id;
    }

    getRoomId(): UniqueId {
        return this.props.roomId;
    }

    getContent(): string {
        return this.props.content;
    }

    getPublicationDate(): Date {
        return this.props.publicationDate;
    }

    getSender(): Sender {
        return this.props.sender;
    }

    static create(props: MessageProps, id?: UniqueId): Result<Message> {
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'sender', value: props.sender },
            { key: 'roomId', value: props.roomId },
            { key: 'content', value: props.content },
            { key: 'publicationDate', value: props.publicationDate }
        ]);
        if(!guard.success){
            return Result.ko<Message>(guard.message);
        }

        if(props.content.length === 0){
            return Result.ko<Message>('Invalid content');
        }

        return Result.ok<Message>(new Message(props, id));
    }
}