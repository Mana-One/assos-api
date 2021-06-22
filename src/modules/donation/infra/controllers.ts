import { 
    makeCancelRecurringDonationController, 
    makeListDonationsController, 
    makeListRecurringDonationsController 
} from "./express";
import { 
    cancelRecurringDonationUsecase, 
    listDonationsUsecase, 
    listRecurringDonationsUseCase 
} from "./usecases";


export const cancelRecurringDonationController = makeCancelRecurringDonationController(
    cancelRecurringDonationUsecase
);

export const listDonationsController = makeListDonationsController(
    listDonationsUsecase
);

export const listRecurringDonationsController = makeListRecurringDonationsController(
    listRecurringDonationsUseCase
);
