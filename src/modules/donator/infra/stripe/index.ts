import { StripeStore } from "../../../../infra/stripe";
import { StoreReference } from "../../domain";
import { StoreService } from "../../services";

export namespace StripeStoreService {
    export const register: StoreService.Register = async (
        input: StoreService.RegisterInput
    ): Promise<StoreReference> => {

        const storeCustomer = await StripeStore.customers.create({
            name: `${input.firstName.getValue()} ${input.lastName.getValue()}`,
            email: input.email.getValue()
        });
        return storeCustomer.id;
    }

    export const removeDonator: StoreService.RemoveDonator = async (
        donatorStoreReference: StoreReference
    ): Promise<void> => {

        await StripeStore.customers.del(donatorStoreReference);
    }

    export const attachCard: StoreService.AttachCard = async (
        donatorStoreReference: StoreReference,
        cardStoreReference: StoreReference
    ): Promise<void> => {

        await StripeStore.paymentMethods.attach(
            cardStoreReference,
            { customer: donatorStoreReference }
        );
    }

    export const removeCard: StoreService.RemoveCard = async (
        cardStoreReference: StoreReference
    ): Promise<void> => {

        await StripeStore.paymentMethods.detach(cardStoreReference);
    }
}