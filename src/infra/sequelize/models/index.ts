import { Dialect, Sequelize } from "sequelize";
import { DatabaseConfig } from "../../../config";
import { associateCard, makeCard } from "./Card";
import { associateUser, makeUser } from "./User";
import { StripeStoreService } from "../../../modules/donator/infra/stripe";


const sequelize = new Sequelize({            
    dialect: DatabaseConfig.DIALECT as Dialect,
    host: DatabaseConfig.HOST,
    database: DatabaseConfig.NAME,
    username: DatabaseConfig.USER,
    password: DatabaseConfig.PASSWORD,
    port: DatabaseConfig.PORT,
    logging: false,
    define: {
        freezeTableName: true
    }
});

const models = {
    Card: makeCard(sequelize, StripeStoreService.attachCard, StripeStoreService.removeCard),
    User: makeUser(sequelize, StripeStoreService.removeDonator)
};

associateCard(models);
associateUser(models);

export {
    sequelize,
    models
}