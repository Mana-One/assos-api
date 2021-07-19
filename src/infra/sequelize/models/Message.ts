import { Model, Optional, Sequelize, DataTypes, ModelCtor } from "sequelize";


interface MessageProps {
    id: string;
    content: string;
    publicationDate: Date;
    senderId: string;
    roomId: string;
}

interface MessageCreationProps extends Optional<MessageProps, "id"> {}

export interface MessageInstance extends Model<MessageProps, MessageCreationProps>, MessageProps {}

export function makeMessage(sequelize: Sequelize){
    return sequelize.define<MessageInstance>("Message", {
        id: { type: DataTypes.UUID, primaryKey: true },
        content: { type: DataTypes.STRING, allowNull: false },
        publicationDate: { type: DataTypes.DATE(3), allowNull: false },
        senderId: { type: DataTypes.UUID, allowNull: false },
        roomId: { type: DataTypes.UUID, allowNull: false }
    }, { timestamps: false });
}

export function associateMessage(models: {[key: string]: ModelCtor<any>}){
    const { Message, Association, User } = models;
    Message.belongsTo(Association, {
        foreignKey: {
            name: 'roomId',
            allowNull: false
        }
    });

    Message.belongsTo(User, {
        foreignKey: {
            name: 'senderId',
            allowNull: false
        }
    });
}