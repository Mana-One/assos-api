import { Entity, UniqueId } from "../../../core/domain";
import { Result } from "../../../core/logic";
import { UserEmail } from "../../../shared/domain";
import { AssociationStatus } from "./AssociationStatus";
import { StoreReference } from "./StoreReference";


interface AssociationProps {
    name: string;
    email: UserEmail;
    bannerUrl: string;
    presentation: string;
    status: AssociationStatus;
    storeReference: StoreReference;
}

export interface EditAssociationInfoProps {
    name?: string;
    email?: UserEmail;
    bannerUrl?: string;
}

export class Association extends Entity<AssociationProps> {
    getId(): UniqueId {
        return this._id;
    }

    getName(): string {
        return this.props.name;
    }

    getEmail(): UserEmail {
        return this.props.email;
    }

    getBannerUrl(): string {
        return this.props.bannerUrl;
    }

    getPresentation(): string {
        return this.props.presentation;
    }

    getStatus(): AssociationStatus {
        return this.props.status;
    }

    getStoreReference(): StoreReference {
        return this.props.storeReference;
    }

    editPresentation(presentation: string): Result<void> {
        if(presentation.length === 0){
            return Result.ko("Invalid presentation");
        }

        this.props.presentation = presentation;
        return Result.ok();
    }

    editInfo(props: EditAssociationInfoProps): Result<void> {
        if(props.name !== undefined){
            if(props.name.length === 0){
                return Result.ko<void>('Invalid name');
            }
            this.props.name = props.name;
        }

        if(props.email !== undefined){
            this.props.email = props.email;
        }

        if(props.bannerUrl !== undefined){
            if(props.bannerUrl.length === 0){
                return Result.ko<void>('Invalid bannerUrl');
            }
            this.props.bannerUrl = props.bannerUrl;
        }

        return Result.ok();
    }

    static create(props: AssociationProps, id?: UniqueId): Result<Association> {
        if(props.name.length === 0){
            return Result.ko<Association>("Invalid name");
        }

        if(props.bannerUrl.length === 0){
            return Result.ko<Association>("Invalid bannerUrl");
        }

        if(props.presentation.length === 0){
            return Result.ko<Association>("Invalid presentation");
        }

        if(props.storeReference.length === 0){
            return Result.ko<Association>("Invalid storeReference");
        }

        return Result.ok<Association>(new Association(props, id));
    }
}