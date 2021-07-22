import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { StripeStore } from "../../../../infra/stripe";
import { Role } from "../../../../shared/domain";
import { SequelizeAssociationRepo } from "../repositories";


export async function createOnboardingLinkController(req: Request, res: Response){
    if(req.body.account?.role !== Role.MANAGER){
        return ExpressController.forbidden(res);
    }

    const { associationId } = req.params;
    const guard = Guard.againstNullOrUndefined({
        key: 'associationId', value: associationId
    });
    if(!guard.success){
        return ExpressController.clientError(res, guard.message);
    }

    if(req.body.account?.associationId !== associationId){
        return ExpressController.forbidden(res);
    }

    const association = await SequelizeAssociationRepo.findById(associationId);
    if(association === null){
        return ExpressController.notFound(res, 'Association not found');
    }

    const link = await StripeStore.accountLinks.create({
        account: association.getStoreReference(),
        refresh_url: 'https://example.com',
        return_url: 'https://example.com',
        type: 'account_onboarding'
    });
    return ExpressController.created(res, { url: link.url});
}