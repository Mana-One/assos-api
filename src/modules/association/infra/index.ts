import express, { Router, Request, Response, Express } from "express";
import { makeIsAuth } from "../../../shared/infra/express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { 
    createAssociationController,
    createMemberController,
    deleteAssociationController,
    deleteMemberController,
    editInfoController, 
    editPresentationController, 
    getAssociationController, 
    getOwnAssociationController, 
    listMembersController
} from './controllers';
import { associationHooksController } from './express/association-hook.controller';
import { createOnboardingLinkController } from './express/create-onboarding-link.controller';


const isAuth = makeIsAuth({
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload
});

const router = Router();

router.post(
    '/', 
    express.json(), 
    createAssociationController
);

router.post(
    '/hooks',
    express.raw({ type: "application/json" }),
    associationHooksController
)

router.get(
    '/affiliated',
    express.json(),
    isAuth,
    getOwnAssociationController
);

router.delete(
    '/:associationId/members/:memberId', 
    express.json(),
    isAuth, 
    deleteMemberController
);

router.post(
    '/:associationId/onboarding',
    express.json(),
    isAuth,
    createOnboardingLinkController
)

router.route('/:associationId/members')
.all(express.json())
.post(isAuth, createMemberController)
.get(isAuth, listMembersController);

router.put(
    '/:associationId/info', 
    express.json(),
    isAuth, 
    editInfoController
);

router.put(
    '/:associationId/presentation', 
    express.json(),
    isAuth, 
    editPresentationController
);

router.route('/:associationId')
.all(express.json())
.get(getAssociationController)
.delete(isAuth, deleteAssociationController);


export function addAssociationRouter(app: Express){
    app.use('/associations', router);
}