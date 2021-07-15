import { makeCreateArticleUsecase } from "../usecases/CreateArticle";
import { makeEditArticleUsecase } from "../usecases/EditArticle";
import { makeGetArticleUsecase } from "../usecases/GetArticle";
import { makeListArticlesUsecase } from "../usecases/ListArticles";
import { makeRemoveArticleUsecase } from "../usecases/RemoveArticle";
import { SequelizeArticleWriteRepo } from "./repositories";
import { SequelizeArticleReadRepo } from "./repositories/SequelizeArticleReadRepo";


export const createArticleUsecase = makeCreateArticleUsecase({
    save: SequelizeArticleWriteRepo.save
});

export const editArticleUsecase = makeEditArticleUsecase({
    findArticle: SequelizeArticleWriteRepo.findById,
    save: SequelizeArticleWriteRepo.save
});

export const getArticleUsecase = makeGetArticleUsecase({
    findArticle: SequelizeArticleReadRepo.findById
});

export const listArticlesUsecase = makeListArticlesUsecase({
    listArticles: SequelizeArticleReadRepo.listByAssociation
});

export const removeArticleUsecase = makeRemoveArticleUsecase({
    findArticle: SequelizeArticleWriteRepo.findById,
    remove: SequelizeArticleWriteRepo.remove
});