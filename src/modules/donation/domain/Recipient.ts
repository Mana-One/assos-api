import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { StoreReference } from "../../donator/domain";

interface RecipientProps {
    storeReference: StoreReference;
}

export class Recipient extends Entity<RecipientProps>{
    getId(): UniqueId {
        return this._id;
    }

    getStoreReference(): StoreReference {
        return this.props.storeReference;
    }

    static create(props: RecipientProps, id: UniqueId): Result<Recipient> {
        const guardResult = Guard.bulkAgainstNullOrUndefined([
            { key: "id", value: id },
            { key: "storeReference", value: props.storeReference }
        ]);
        if(!guardResult.success){
            return Result.ko<Recipient>(guardResult.message);
        }

        if(props.storeReference.length === 0){
            return Result.ko<Recipient>("Invalid store reference");
        }

        return Result.ok<Recipient>(new Recipient(props, id));
    }
}