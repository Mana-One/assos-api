import express, { Router, Express } from "express";
import { makeIsAuth } from "../../../shared/infra/express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { createArticleController, editArticleController, getArticleController, listAffiliatedArticlesController, listArticlesController, removeArticleController } from "./controllers";


const router = Router();
const isAuth = makeIsAuth({
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload
});

router.post(
    '/',
    isAuth,
    createArticleController
);

router.get(
    '/association/:associationId',
    listArticlesController
);

router.get(
    '/affiliated',
    isAuth,
    listAffiliatedArticlesController
);

router.route('/:articleId')
    .get(getArticleController)
    .put(isAuth, editArticleController)
    .delete(isAuth, removeArticleController);


export function addArticleRouter(app: Express){
    app.use('/articles', express.json(), router);
}