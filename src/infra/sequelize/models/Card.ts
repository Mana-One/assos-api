import { Model, Optional, Sequelize, DataTypes, ModelCtor } from "sequelize";
import { StoreService } from "../../../modules/donator/services";


interface CardProps {
    id: string;
    last4: string;
    storeReference: string;
    donatorId: string;
}

interface CardCreationProps extends Optional<CardProps, "id"> {}

interface CardInstance extends Model<CardProps, CardCreationProps>, CardProps {}

export function makeCard(sequelize: Sequelize, removeCard: StoreService.RemoveCard){
    const Card = sequelize.define<CardInstance>("Card", {
        id: { type: DataTypes.UUID, primaryKey: true },
        last4: { type: DataTypes.STRING(16), allowNull: false },
        storeReference: { type: DataTypes.STRING, allowNull: false },
        donatorId: { type: DataTypes.UUID, allowNull: false },
    }, { timestamps: false });

    Card.afterDestroy("store-clean-up", async (instance: CardInstance) => {
        await removeCard(instance.storeReference);
    })

    return Card;
}

export function associateCard(models: {[key: string]: ModelCtor<any>}){
    const { Card, User } = models;
    Card.belongsTo(User, {
        foreignKey: {
            name: "donatorId",
            allowNull: false
        }
    });
}