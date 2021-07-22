import { Model, Optional, Sequelize, DataTypes, ModelCtor } from "sequelize";


interface ArticleProps {
    id: string;
    title: string;
    content: string;
    publicationDate: Date;
    associationId: string;
}

interface ArticleCreationProps extends Optional<ArticleProps, "id"> {}

export interface ArticleInstance extends Model<ArticleProps, ArticleCreationProps>, ArticleProps {}

export function makeArticle(sequelize: Sequelize){
    return sequelize.define<ArticleInstance>("Article", {
        id: { type: DataTypes.UUID, primaryKey: true },
        title: { type: DataTypes.STRING(100), allowNull: false },
        content: { type: DataTypes.STRING, allowNull: false },
        publicationDate: { type: DataTypes.DATEONLY, allowNull: false },
        associationId: { type: DataTypes.UUID, allowNull: false }
    }, { timestamps: false });
}

export function associateArticle(models: {[key: string]: ModelCtor<any>}){
    const { Article, Association } = models;
    Article.belongsTo(Association, {
        onDelete: 'CASCADE',
        foreignKey: {
            name: 'associationId',
            allowNull: false
        }
    });
}