import { UniqueId } from "../../../core/domain";
import { Payer } from "../domain";

export namespace PayerMap {
    export function toDomain(raw: any): Payer {
        return Payer.create({
            storeReference: raw.storeReference
        }, new UniqueId(raw.id)).getValue();
    }
}