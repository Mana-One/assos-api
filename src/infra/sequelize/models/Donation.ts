import { DataTypes, Model, ModelCtor, Optional, Sequelize } from "sequelize";
import { DonationType } from "../../../modules/donation/domain";

interface DonationProps {
    id: string;
    amount: number;
    currency: string;
    type: DonationType;
    payerId: string;
    recipientId: string;
}

interface DonationCreationProps extends Optional<DonationProps, "id"> {}

export interface DonationInstance extends Model<DonationProps, DonationCreationProps>, DonationProps {}

export function makeDonation(sequelize: Sequelize){
    return sequelize.define<DonationInstance>("Donation", {
        id: { type: DataTypes.UUID, primaryKey: true },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        currency: { type: DataTypes.STRING(3), allowNull: false },
        type: { type: DataTypes.STRING(50), allowNull: false },
        payerId: { type: DataTypes.UUID, allowNull: false },
        recipientId: { type: DataTypes.UUID }
    }, { timestamps: false });
}

export function associateDonation(models: {[key: string]: ModelCtor<any>}){
    const { Donation, User, Association } = models;
    Donation.belongsTo(User, {
        onDelete: 'CASCADE',
        foreignKey: {
            name: "payerId",
            allowNull: false
        }
    });

    Donation.belongsTo(Association, {
        onDelete: 'CASCADE',
        foreignKey: {
            name: "recipientId",
            allowNull: false
        }
    });
}