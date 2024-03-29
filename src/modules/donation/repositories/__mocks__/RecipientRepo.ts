import { UniqueId } from "../../../../core/domain";
import { Recipient } from "../../domain";


export const FindById = {
    null: async (s: string) => null,
    notNull: async (s: string) => Recipient.create(
        { name: "a name", storeReference: "a store reference" },
        new UniqueId(s)
    ).getValue(),
    throw: async (s: string) => { throw new Error("oopsie"); }
}