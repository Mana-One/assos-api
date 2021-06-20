import { Model, Optional, Sequelize, DataTypes, ModelCtor } from "sequelize";


interface AssociationProps {
    id: string;
    name: string;
    storeReference: string;
}

interface AssociationCreationProps extends Optional<AssociationProps, "id"> {}

export interface AssociationInstance extends Model<AssociationProps, AssociationCreationProps>, AssociationProps {}

export function makeAssociation(sequelize: Sequelize){
    return sequelize.define<AssociationInstance>("Association", {
        id: { type: DataTypes.UUID, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        storeReference: { type: DataTypes.STRING, defaultValue: null }
    }, { timestamps: false });
}

export function associateAssociation(models: {[key: string]: ModelCtor<any>}){
    const { Association, User, Donation, RecurringDonation } = models;
    Association.hasMany(Donation, {
        foreignKey: {
            name: "recipientId",
            allowNull: false
        }
    });

    Association.belongsToMany(User, {
        foreignKey: "recipientId",
        otherKey: "payerId",
        through: RecurringDonation
    });
}