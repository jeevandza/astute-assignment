import {  Sequelize } from "sequelize";

/**
 * Database connection using sequelize 
 */
const sequelizeConnection =  new Sequelize(process.env.POSTGRES_DB_URL!);


export { sequelizeConnection };
