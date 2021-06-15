import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { StoreReference } from "./StoreReference";


interface PayerProps {
    storeReference: StoreReference;
}

export class Payer extends Entity<PayerProps> {
    getId(): UniqueId {
        return this._id;
    }

    getStoreReference(): StoreReference {
        return this.props.storeReference;
    }

    static create(props: PayerProps, id: UniqueId): Result<Payer> {
        const guardResult = Guard.bulkAgainstNullOrUndefined([
            { key: "id", value: id },
            { key: "storeReference", value: props.storeReference }
        ]);
        if(!guardResult.success){
            return Result.ko<Payer>(guardResult.message);
        }

        if(props.storeReference.length === 0){
            return Result.ko<Payer>("Invalid store reference");
        }

        return Result.ok<Payer>(new Payer(props, id));
    }
}