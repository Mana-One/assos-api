import { makeCreateArticleController } from "./express/create-article.controller";
import { makeEditArticleController } from "./express/edit-article.controller";
import { makeGetArticleController } from "./express/get-article.controller";
import { makeListAffiliatedArticlesController } from "./express/list-affiliated-articles.controller";
import { makeListArticlesController } from "./express/list-articles.controller";
import { makeRemoveArticleController } from "./express/remove-article.controller";
import { createArticleUsecase, editArticleUsecase, getArticleUsecase, listArticlesUsecase, removeArticleUsecase } from "./usecases";


export const createArticleController = makeCreateArticleController(
    createArticleUsecase
);

export const editArticleController = makeEditArticleController(
    editArticleUsecase
);

export const getArticleController = makeGetArticleController(
    getArticleUsecase
);

export const listAffiliatedArticlesController = makeListAffiliatedArticlesController(
    listArticlesUsecase
);

export const listArticlesController = makeListArticlesController(
    listArticlesUsecase
);

export const removeArticleController = makeRemoveArticleController(
    removeArticleUsecase
);