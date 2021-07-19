export type SenderDto = Readonly<{
    id: string;
    username: string;
    role: string;
}>;

export function createSenderDto(props: any): SenderDto {
    return Object.freeze({
        id: props.id,
        username: props.username,
        role: props.role
    });
}