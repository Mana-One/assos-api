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
    const { User, Association, Donation, RecurringDonation, Message } = models;

    User.hasMany(Donation, {
        //onDelete: 'CASCADE',
        foreignKey: {
            name: "payerId",
            allowNull: false
        }
    });

    User.belongsTo(Association, {
        onDelete: 'CASCADE',
        foreignKey: {
            name: "associationId"
        }
    });

    User.belongsToMany(Association, {
        //onDelete: 'CASCADE',
        foreignKey: "payerId",
        otherKey: "recipientId",
        through: RecurringDonation
    });

    /*User.belongsTo(Association, {
        as: 'Member',
        foreignKey: {
            name: 'associationId'
        }
    });*/

    User.hasMany(Message, {
        //onDelete: 'CASCADE',
        foreignKey: {
            name: 'senderId',
            allowNull: false
        }
    });
}
