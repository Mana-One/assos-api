import { makeCancelRecurringDonationUsecase } from "../usecases/CancelRecurringDonation";
import { makeListDonationsUsecase } from "../usecases/ListDonations";
import { makeListReceivedDonationsUsecase } from "../usecases/ListReceivedDonations";
import { makeListRecurringDonationsUsecase } from "../usecases/ListRecurringDonations";
import { SequelizePayerRepo, SequelizeRecipientRepo, SequelizeDonationRepo } from "./sequelize";
import { StripePaymentService } from "./stripe";


export const cancelRecurringDonationUsecase = makeCancelRecurringDonationUsecase({
    cancelRecurringPayment: StripePaymentService.cancelRecurringPayment,
    findPayerById: SequelizePayerRepo.findById,
    findRecipientById: SequelizeRecipientRepo.findById,
    findRecurringDonation: SequelizeDonationRepo.findRecurring,
    removeRecurringDonation: SequelizeDonationRepo.removeRecurring
});

export const listDonationsUsecase = makeListDonationsUsecase({
    listDonations: SequelizeDonationRepo.listByPayerId
});

export const listReceivedDonationsUsecase = makeListReceivedDonationsUsecase({
    listDonations: SequelizeDonationRepo.listByRecipientId
});

export const listRecurringDonationsUseCase = makeListRecurringDonationsUsecase({
    listRecurring: SequelizeDonationRepo.listRecurringByPayerId
});