import { createSenderDto, SenderDto } from "./SenderDto";

export type MessageListItemDto = Readonly<{
    content: string;
    timestamp: number;
    sender: SenderDto;
}>;

export type MessageListDto = Array<MessageListItemDto>;

export function createMessageListItem(props: any): MessageListItemDto {
    return Object.freeze({
        content: props.content,
        timestamp: new Date(props.publicationDate).getTime(),
        sender: createSenderDto(props.Sender)
    });
}

export function createMessageList(props: any[]): MessageListDto {
    return props.map(elm => createMessageListItem(elm));
}