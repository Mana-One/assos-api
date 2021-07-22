import { models } from "../../../../infra/sequelize";
import { Message } from "../../domain";
import { MessageWriteRepo } from "../../repositories";

export namespace SequelizeMessageWriteRepo {
    export const save: MessageWriteRepo.Save = async (
        message: Message
    ): Promise<void> => {
        await models.Message.create({
            id: message.getId().toString(),
            content: message.getContent(),
            publicationDate: message.getPublicationDate(),
            senderId: message.getSender().getId().toString(),
            roomId: message.getRoomId().toString()
        });
    }
}