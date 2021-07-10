import { makeCreateAssociationUsecase } from '../usecases/CreateAssociation';
import { makeCreateMemberUsecase } from '../usecases/CreateMember';
import { makeDeleteAssociationUsecase} from '../usecases/DeleteAssociation';
import { makeDeleteMemberUsecase } from '../usecases/DeleteMember';
import { makeEditInfoUsecase } from '../usecases/EditInfo';
import { makeEditPresentationUsecase } from '../usecases/EditPresentation';
import { makeGetAssociationUsecase } from '../usecases/GetAssociation';
import { makeListMembersUsecase } from '../usecases/ListMembers';
import { SequelizeAssociationRepo, SequelizeMemberRepo } from './repositories';
import { StripeMerchantService } from './stripe';


export const createAssociationUsecase = makeCreateAssociationUsecase({
    registerMerchant: StripeMerchantService.registerMerchant,
    isEmailUsed: SequelizeAssociationRepo.isMemberEmailUsed,
    createAssociation: SequelizeAssociationRepo.createAssociation
});

export const createMemberUsecase = makeCreateMemberUsecase({
    findAssociationById: SequelizeAssociationRepo.findById,
    isEmailUsed: SequelizeAssociationRepo.isMemberEmailUsed,
    save: SequelizeMemberRepo.save
});

export const deleteAssociationUsecase = makeDeleteAssociationUsecase({
    findAssociation: SequelizeAssociationRepo.findById,
    removeAssociation: SequelizeAssociationRepo.remove
});

export const deleteMemberUsecase = makeDeleteMemberUsecase({
    findMember: SequelizeMemberRepo.findMember,
    countManagers: SequelizeMemberRepo.countManagers,
    removeMember: SequelizeMemberRepo.remove
});

export const editInfoUsecase = makeEditInfoUsecase({
    findAssociation: SequelizeAssociationRepo.findById,
    save: SequelizeAssociationRepo.save
});

export const editPresentationUsecase = makeEditPresentationUsecase({
    findAssociation: SequelizeAssociationRepo.findById,
    save: SequelizeAssociationRepo.save
});

export const getAssociationUsecase = makeGetAssociationUsecase({
    findAssociation: SequelizeAssociationRepo.findById
});

export const listMembersUsecase = makeListMembersUsecase({
    findMembers: SequelizeMemberRepo.listMembersByAssociation
});