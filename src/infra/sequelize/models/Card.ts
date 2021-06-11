import { 
    Model, 
    Optional, 
    Sequelize, 
    DataTypes, 
    ModelCtor, 
    BelongsToGetAssociationMixin 
} from "sequelize";
import { UserInstance } from "./User";


interface CardProps {
    id: string;
    last4: string;
    storeReference: string;
    donatorId: string;
}

interface CardCreationProps extends Optional<CardProps, "id"> {}

export interface CardInstance extends Model<CardProps, CardCreationProps>, CardProps {
    getDonator: BelongsToGetAssociationMixin<UserInstance>
}

export function makeCard (sequelize: Sequelize){
    return sequelize.define<CardInstance>("Card", {
        id: { type: DataTypes.UUID, primaryKey: true },
        last4: { type: DataTypes.STRING(16), allowNull: false },
        storeReference: { type: DataTypes.STRING, allowNull: false },
        donatorId: { type: DataTypes.UUID, allowNull: false },
    }, { timestamps: false });
}

export function associateCard(models: {[key: string]: ModelCtor<any>}){
    const { Card, User } = models;
    Card.belongsTo(User, {
        onDelete: 'CASCADE',
        hooks: true,
        foreignKey: {
            name: "donatorId",
            allowNull: false
        }
    });
}