export type DonatorListItemDto = Readonly<{
    id: string;
    firstName: string;
    lastName: string;
}>;

export type DonatorListDto = Readonly<{
    total: number;
    donators: Array<DonatorListItemDto>;
}>;

export function createDonatorListItemDto(props: any): DonatorListItemDto {
    return Object.freeze({
        id: props.id,
        firstName: props.firstName,
        lastName: props.lastName
    });
}

export function createDonatorListDto(props: any[], total: number): DonatorListDto {
    return Object.freeze({
        total,
        donators: props.map(elm => createDonatorListItemDto(elm))
    });
}