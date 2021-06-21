import { StripeStore } from "../../../../infra/stripe";
import { StoreReference } from "../../domain";
import { PaymentService } from "../../services";


export namespace StripePaymentService {
    export const cancelRecurringPayment: PaymentService.CancelRecurringPayment = async (
        recurringStoreReference: StoreReference
    ): Promise<void> => {
        await StripeStore.subscriptions.del(recurringStoreReference);
    }
}