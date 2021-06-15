import { UniqueId } from "../../../../core/domain";
import { Recipient } from "../../domain";

export const Exists = {
    yes: async (s: string) => true,
    no: async (s: string) => false,
    throw: async (s: string) => { throw new Error("oopsie"); }
}

export const FindById = {
    null: async (s: string) => null,
    notNull: async (s: string) => Recipient.create(
        { name: "a name", storeReference: "a store reference" },
        new UniqueId(s)
    ).getValue(),
    throw: async (s: string) => { throw new Error("oopsie"); }
}