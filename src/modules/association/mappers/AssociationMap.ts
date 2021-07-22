import { UniqueId } from "../../../core/domain";
import { UserEmail } from "../../../shared/domain";
import { Association } from "../domain";


export interface AssociationDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly status: string;
    readonly bannerUrl: string;
    readonly presentation: string;
}

export namespace AssociationMap {
    export function toDto(association: Association): AssociationDto {
        return Object.freeze({
            id: association.getId().toString(),
            name: association.getName(),
            email: association.getEmail().getValue(),
            status: association.getStatus(), 
            bannerUrl: association.getBannerUrl(),
            presentation: association.getPresentation()
        });
    }

    export function toPersistence(association: Association){
        return Object.freeze({
            id: association.getId().toString(),
            name: association.getName(),
            email: association.getEmail().getValue(),
            bannerUrl: association.getBannerUrl(),
            presentation: association.getPresentation(),
            storeReference: association.getStoreReference(),
            status: association.getStatus()
        });
    }

    export function toDomain(raw: any): Association {
        return Association.create({
            name: raw.name,
            email: UserEmail.create(raw.email).getValue(),
            bannerUrl: raw.bannerUrl,
            presentation: raw.presentation,
            status: raw.status,
            storeReference: raw.storeReference
        }, new UniqueId(raw.id)).getValue();
    }
}