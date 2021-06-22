import { models } from "../../../../infra/sequelize";
import { Amount, Donation, Recipient } from "../../domain";
import { RecurringDonation } from "../../domain/RecurringDonation";
import { DonationMap, RecurringDonationMap } from "../../mappers";
import { DonationRepo, ListDonationsResponse, ListRecurringResponse } from "../../repositories";


export namespace SequelizeDonationRepo {
    export const listByPayerId: DonationRepo.ListByPayerId = async (payerId: string, limit: number, offset: number): Promise<ListDonationsResponse> => {
        const { count: total, rows: donations } = await models.Donation.findAndCountAll({
            where: { payerId },
            include: [{ model: models.Association }],
            limit,
            offset,
            order: [["id", "DESC"]]
        });

        return {
            total,
            donations: donations.map(elm => DonationMap.toDomain(elm))
        };
    }

    export const listRecurringByPayerId: DonationRepo.ListRecurringByPayerId = async (payerId: string, limit: number, offset: number): Promise<ListRecurringResponse> => {
        const { count: total, rows } = await models.RecurringDonation.findAndCountAll({
            where: { payerId },
            include: [{ model: models.Association }],
            limit,
            offset
        });

        return {
            total,
            recurringDonations: rows.map(elm => RecurringDonationMap.toDomain(elm))
        };
    }

    export const listByRecipientId: DonationRepo.ListByRecipientId = async (recipientId: string, limit: number, offset: number): Promise<ListDonationsResponse> => {
        const { count: total, rows: donations } = await models.Donation.findAndCountAll({
            where: { recipientId },
            include: [{ model: models.Association }],
            limit,
            offset,
            order: [["id", "DESC"]]
        });

        return {
            total,
            donations: donations.map(elm => DonationMap.toDomain(elm))
        };
    }

    export const findRecurring: DonationRepo.FindRecurring = async (payerId: string, recipientId: string): Promise<RecurringDonation | null> => {
        const instance = await models.RecurringDonation.findOne({
            where: {
                payerId,
                recipientId
            },
            include: [{ model: models.Association }]
        });
        if(instance === null){
            return null;
        }

        return RecurringDonationMap.toDomain(instance);
    }

    export const removeRecurring: DonationRepo.RemoveRecurring = async (recurringDonation: RecurringDonation): Promise<void> => {
        await models.RecurringDonation.destroy({
            where: {
                payerId: recurringDonation.getPayerId().toString(),
                recipientId: recurringDonation.getRecipient().getId().toString()
            }
        });
    }  

    export const save: DonationRepo.Save = async (donation: Donation): Promise<void> => {
        const raw = DonationMap.toPersistence(donation);
        await models.Donation.create(raw);
    } 

    export const setUpRecurring: DonationRepo.SetUpRecurring = async (payerId: string, recipientId: string, amount: Amount, storeReference: string): Promise<void> => {
        await models.RecurringDonation.create({
            payerId,
            recipientId,
            amount: amount.getValue(),
            currency: amount.getCurrency(),
            storeReference
        });
    }
} 