import { createSenderDto, SenderDto } from "./SenderDto";

export type MessageListItemDto = Readonly<{
    content: string;
    publicationDate: Date;
    sender: SenderDto;
}>;

export type MessageListDto = Array<MessageListItemDto>;

export function createMessageListItem(props: any): MessageListItemDto {
    return Object.freeze({
        content: props.content,
        publicationDate: new Date(props.publicationDate),
        sender: createSenderDto(props.Sender)
    });
}

export function createMessageList(props: any[]): MessageListDto {
    return props.map(elm => createMessageListItem(elm));
}