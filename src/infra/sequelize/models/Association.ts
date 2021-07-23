import { Model, Optional, Sequelize, DataTypes, ModelCtor, Association } from "sequelize";
import { AssociationStatus } from "../../../modules/association/domain";


interface AssociationProps {
    id: string;
    name: string;
    email: string;
    bannerUrl: string;
    status: AssociationStatus;
    presentation: string;
    storeReference: string;
}

interface AssociationCreationProps extends Optional<AssociationProps, "id"> {}

export interface AssociationInstance extends Model<AssociationProps, AssociationCreationProps>, AssociationProps {}

export function makeAssociation(sequelize: Sequelize){
    return sequelize.define<AssociationInstance>("Association", {
        id: { type: DataTypes.UUID, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        bannerUrl: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING(50), allowNull: false },
        presentation: { type: DataTypes.TEXT, allowNull: false  },
        storeReference: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: false });
}

export function associateAssociation(models: {[key: string]: ModelCtor<any>}){
    const { Association, User, Donation, RecurringDonation, Article, Message } = models;
    Association.hasMany(Donation, {
        foreignKey: {
            name: "recipientId"
        }
    });

    Association.hasMany(User, {
        foreignKey: {
            name: "associationId"
        }
    });

    Association.belongsToMany(User, {
        foreignKey: "recipientId",
        otherKey: "payerId",
        through: RecurringDonation
    });

    Association.hasMany(Article, {
        foreignKey: {
            name: 'associationId',
            allowNull: false
        }
    });

    Association.hasMany(Message, {
        foreignKey: {
            name: 'roomId',
            allowNull: false
        }
    });
}