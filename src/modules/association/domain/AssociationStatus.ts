export enum AssociationStatus {
    CREATED = "created",
    VALID = "valid"
}

export function isAssociationStatus(v: any): v is AssociationStatus {
    return v === AssociationStatus.CREATED || v === AssociationStatus.VALID;
}