import { Association } from "../domain";


export interface AssociationDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly bannerUrl: string;
    readonly presentation: string;
}

export namespace AssociationMap {
    export function toDto(association: Association): AssociationDto {
        return Object.freeze({
            id: association.getId().toString(),
            name: association.getName(),
            email: association.getEmail().getValue(),
            bannerUrl: association.getBannerUrl(),
            presentation: association.getPresentation()
        });
    }
}