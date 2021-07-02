import { Entity, UniqueId } from "../../../core/domain";
import { Result } from "../../../core/logic";
import { UserEmail } from "../../../shared/domain";
import { StoreReference } from "./StoreReference";


interface AssociationProps {
    name: string;
    email: UserEmail;
    bannerUrl: string;
    presentation: string;
    storeReference: StoreReference;
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

    getStoreReference(): StoreReference {
        return this.props.storeReference;
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