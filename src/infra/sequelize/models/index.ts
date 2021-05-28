import { Dialect, Sequelize } from "sequelize";
import { DatabaseConfig } from "../../../config";
import { makeUser } from "./User";


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
    User: makeUser(sequelize)
};

export {
    sequelize,
    models
}