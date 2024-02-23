import { Pool } from "pg";
import { Dialect, Sequelize } from "sequelize";
import fs from 'fs'

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


const sequelizeConnection =  new Sequelize(process.env.POSTGRES_DB_URL!)




export { sequelizeConnection };
