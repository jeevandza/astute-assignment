import {  Sequelize } from "sequelize";

const sequelizeConnection =  new Sequelize(process.env.POSTGRES_DB_URL!)

export { sequelizeConnection };
