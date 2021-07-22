import { makeListMessagesUsecase } from "../usecases/ListMessages";
import { makePostMessageUsecase } from "../usecases/PostMessage";
import { SequelizeMessageReadRepo, SequelizeMessageWriteRepo } from "./repositories";


export const listMessagesUsecase = makeListMessagesUsecase({
    listMessages: SequelizeMessageReadRepo.listByRoom
});

export const postMessageUsecase = makePostMessageUsecase({
    save: SequelizeMessageWriteRepo.save
});