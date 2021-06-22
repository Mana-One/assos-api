import { makeRegisterDonationUsecase } from "../../../usecases/RegisterDonation";
import { makeSetUpRecurringDonationUsecase } from "../../../usecases/SetUpRecurringDonation";
import { SequelizeRecipientRepo, SequelizeDonationRepo, SequelizePayerRepo } from "../../sequelize";
import { makeRegisterDonationController } from "./register-donation.controller";
import { makeSetUpRecurringDonationController } from "./set-up-recurring-donation.controller";


const registerDonationUsecase = makeRegisterDonationUsecase({
    findRecipient: SequelizeRecipientRepo.findById,
    save: SequelizeDonationRepo.save
});

const setUpRecurringDonationUsecase = makeSetUpRecurringDonationUsecase({
    findPayerById: SequelizePayerRepo.findById,
    findRecipientById: SequelizeRecipientRepo.findById,
    setUpRecurringDonation: SequelizeDonationRepo.setUpRecurring
});


export const registerDonationController = makeRegisterDonationController(
    registerDonationUsecase
);

export const setUpRecurringDonationController = makeSetUpRecurringDonationController(
    setUpRecurringDonationUsecase
);