import { UniqueId } from "../../../../core/domain";
import { Payer } from "../../domain";

export const FindById = {
    null: async (payerId: string) => null,
    notNull: async (payerId: string) => Payer.create(
        { storeReference: "a store reference" },
        new UniqueId(payerId) 
    ).getValue(),
    throw: async (payerId: string) => { throw new Error("oopsie"); }
}