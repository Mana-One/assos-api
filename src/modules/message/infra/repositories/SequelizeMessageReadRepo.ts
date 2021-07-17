import { models } from "../../../../infra/sequelize";
import { createMessageList, MessageListDto } from "../../domain";
import { MessageReadRepo } from "../../repositories";

export namespace SequelizeMessageReadRepo {
    export const listByRoom: MessageReadRepo.ListByRoom = async (
        roomId: string,
        limit: number,
        offset: number
    ): Promise<MessageListDto> => {
        const instances = await models.Message.findAll({
            where: { roomId },
            order: [['publicationDate', 'DESC']],
            limit,
            offset
        });

        const messageList = createMessageList(instances).reverse();
        return messageList;
    }
}