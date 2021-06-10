import { StripeStore } from "../../../../infra/stripe";
import { Donator, StoreReference } from "../../domain";
import { StoreService } from "../../services";

export namespace StripeStoreService {
    export const register: StoreService.Register = async (input: StoreService.RegisterInput): Promise<StoreReference> => {
        const storeCustomer = await StripeStore.customers.create({
            name: `${input.firstName.getValue()} ${input.lastName.getValue()}`,
            email: input.email.getValue()
        });
        return storeCustomer.id;
    }

    export const removeDonator: StoreService.RemoveDonator = async (donatorStoreReference: StoreReference): Promise<void> => {
        await StripeStore.customers.del(donatorStoreReference);
    }

    export const removeCard: StoreService.RemoveCard = async (cardStoreReference: StoreReference): Promise<void> => {
        await StripeStore.paymentMethods.detach(cardStoreReference);
    }
}