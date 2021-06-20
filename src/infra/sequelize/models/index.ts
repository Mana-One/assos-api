import { Dialect, Sequelize } from "sequelize";
import { DatabaseConfig } from "../../../config";
import { associateCard, makeCard } from "./Card";
import { associateUser, makeUser } from "./User";
import { addCardHooks, addUserHooks } from "../hooks";
import { StripeStoreService } from "../../../modules/donator/infra/stripe";
import { makeAssociation } from "./Association";
import { associateDonation, makeDonation } from "./Donation";


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
    Association: makeAssociation(sequelize),
    Card: makeCard(sequelize),
    Donation: makeDonation(sequelize),
    User: makeUser(sequelize)
};

associateDonation(models);
associateCard(models);
associateDonation(models);
associateUser(models);

addCardHooks(models.Card, models.User, StripeStoreService.attachCard, StripeStoreService.removeCard);
addUserHooks(models.User, StripeStoreService.removeDonator);

export {
    sequelize,
    models
}