import { 
    makeCancelRecurringDonationController, 
    makeListDonationsController, 
    makeListRecurringDonationsController 
} from "./express";
import { makeListReceivedDonationsController } from "./express/list-received-donations.controller";
import { 
    cancelRecurringDonationUsecase, 
    listDonationsUsecase, 
    listReceivedDonationsUsecase, 
    listRecurringDonationsUseCase 
} from "./usecases";


export const cancelRecurringDonationController = makeCancelRecurringDonationController(
    cancelRecurringDonationUsecase
);

export const listDonationsController = makeListDonationsController(
    listDonationsUsecase
);

export const listReceivedDonationsController = makeListReceivedDonationsController(
    listReceivedDonationsUsecase
);

export const listRecurringDonationsController = makeListRecurringDonationsController(
    listRecurringDonationsUseCase
);
