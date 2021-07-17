export type SenderDto = Readonly<{
    id: string;
    name: string;
    role: string;
}>;

export function createSenderDto(props: any): SenderDto {
    return Object.freeze({
        id: props.id,
        name: props.name,
        role: props.role
    });
}