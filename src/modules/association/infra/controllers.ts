import { 
    createAssociationUsecase, 
    createMemberUsecase, 
    deleteAssociationUsecase, 
    deleteMemberUsecase, 
    editInfoUsecase,
    editPresentationUsecase,
    getAssociationUsecase,
    listMembersUsecase
} from './usecases';
import { 
    makeCreateAssociationController,
    makeCreateMemberController, 
    makeDeleteAssociationController,
    makeDeleteMemberController,
    makeEditInfoController,
    makeEditPresentationController,
    makeGetAssociationController,
    makeGetOwnAssociationController,
    makeListMembersController
} from './express';


export const createAssociationController = makeCreateAssociationController(createAssociationUsecase);

export const createMemberController = makeCreateMemberController(createMemberUsecase);

export const deleteAssociationController = makeDeleteAssociationController(deleteAssociationUsecase);

export const deleteMemberController = makeDeleteMemberController(deleteMemberUsecase);

export const editInfoController = makeEditInfoController(editInfoUsecase);

export const editPresentationController = makeEditPresentationController(editPresentationUsecase);

export const getAssociationController = makeGetAssociationController(getAssociationUsecase);

export const getOwnAssociationController = makeGetOwnAssociationController(getAssociationUsecase);

export const listMembersController = makeListMembersController(listMembersUsecase);