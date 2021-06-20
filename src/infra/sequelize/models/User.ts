import { Model, Optional, Sequelize, DataTypes, ModelCtor } from "sequelize";


interface UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    storeReference: string;
    role: string;
    associationId: string;
}

interface UserCreationProps extends Optional<UserProps, "id" | "storeReference" | "associationId"> {}

export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {}

export function makeUser(sequelize: Sequelize){
    return sequelize.define<UserInstance>("User", {
        id: { type: DataTypes.UUID, primaryKey: true },
        firstName: { type: DataTypes.STRING(100), allowNull: false },
        lastName: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        storeReference: { type: DataTypes.STRING, defaultValue: null },
        role: { type: DataTypes.STRING(100), allowNull: false },
        associationId: { type: DataTypes.UUID, defaultValue: null },
    }, { timestamps: false });
}

export function associateUser(models: {[key: string]: ModelCtor<any>}){
    const { User, Card, Association, Donation, RecurringDonation } = models;
    User.hasMany(Card, {
        onDelete: 'CASCADE',
        hooks: true,
        foreignKey: {
            name: "donatorId",
            allowNull: false
        }
    });

    User.hasMany(Donation, {
        foreignKey: {
            name: "payerId",
            allowNull: false
        }
    });

    User.belongsToMany(Association, {
        foreignKey: "payerId",
        otherKey: "recipientId",
        through: RecurringDonation
    })
}