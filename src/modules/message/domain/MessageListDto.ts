export type MessageListItemDto = Readonly<{
    senderId: string;
    content: string;
    publicationDate: Date;
}>;

export type MessageListDto = Array<MessageListItemDto>;

export function createMessageListItem(props: any): MessageListItemDto {
    return Object.freeze({
        senderId: props.senderId,
        content: props.content,
        publicationDate: new Date(props.publicationDate)
    });
}

export function createMessageList(props: any[]): MessageListDto {
    return props.map(elm => createMessageListItem(elm));
}