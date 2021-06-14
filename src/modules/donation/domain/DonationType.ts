export enum DonationType {
    SINGLE = "single",
    RECURRING = "recurring"
}

export function isDonationType(value: any): value is DonationType {
    return value === DonationType.RECURRING ||
        value === DonationType.SINGLE;
}