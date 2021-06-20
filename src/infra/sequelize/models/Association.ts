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

/*export function associateAssociation(models: {[key: string]: ModelCtor<any>}){
    const { Association, Card } = models;
    Association.hasMany(Card, {
        onDelete: 'CASCADE',
        hooks: true,
        foreignKey: {
            name: "donatorId",
            allowNull: false
        }
    });
}*/