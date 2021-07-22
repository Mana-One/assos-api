import { Dialect, Sequelize } from "sequelize";
import { DatabaseConfig } from "../../../config";
import { associateUser, makeUser } from "./User";
import { addAssociationHooks, addUserHooks } from "../hooks";
import { StripeStoreService } from "../../../modules/donator/infra/stripe";
import { associateAssociation, makeAssociation } from "./Association";
import { associateDonation, makeDonation } from "./Donation";
import { associateRecurringDonation, makeRecurringDonation } from "./RecurringDonation";
import { associateArticle, makeArticle } from "./Article";
import { associateMessage, makeMessage } from "./Message";


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
    Article: makeArticle(sequelize),
    Association: makeAssociation(sequelize),
    Donation: makeDonation(sequelize),
    Message: makeMessage(sequelize),
    RecurringDonation: makeRecurringDonation(sequelize),
    User: makeUser(sequelize)
};

associateArticle(models);
associateAssociation(models);
associateDonation(models);
associateMessage(models);
associateRecurringDonation(models);
associateUser(models);

addAssociationHooks(models.Association);
addUserHooks(models.User, StripeStoreService.removeDonator);

export {
    sequelize,
    models
}