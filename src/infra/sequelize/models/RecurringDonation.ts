import { Model, Optional, Sequelize, DataTypes, ModelCtor } from "sequelize";
import { AssociationInstance } from "./Association";


interface RecurringDonationProps {
    amount: number;
    currency: string;
    storeReference: string;
    payerId: string;
    recipientId: string;
}

export interface RecurringDonationInstance extends Model<RecurringDonationProps>, RecurringDonationProps {
    Recipient?: AssociationInstance;
}

export function makeRecurringDonation(sequelize: Sequelize){
    return sequelize.define<RecurringDonationInstance>("RecurringDonation", {
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        currency: { type: DataTypes.STRING(3), allowNull: false },
        storeReference: { type: DataTypes.STRING, defaultValue: null },
        payerId: { type: DataTypes.UUID, allowNull: false },
        recipientId: { type: DataTypes.UUID, defaultValue: null },
    }, { timestamps: false });
}

export function associateRecurringDonation(models: {[key: string]: ModelCtor<any>}){
    const { RecurringDonation, Association, User } = models;
    RecurringDonation.belongsTo(Association, {
        foreignKey: {
            name: "recipientId",
            allowNull: false
        }
    });

    RecurringDonation.belongsTo(User, {
        foreignKey: {
            name: "payerId",
            allowNull: false
        }
    });
}