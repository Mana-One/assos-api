import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";


interface MessageProps {
    senderId: UniqueId;
    roomId: UniqueId;
    content: string;
    publicationDate: Date;
}

export class Message extends Entity<MessageProps> {
    getId(): UniqueId {
        return this._id;
    }

    getSenderId(): UniqueId {
        return this.props.senderId;
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

    static create(props: MessageProps, id?: UniqueId): Result<Message> {
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'senderId', value: props.senderId },
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