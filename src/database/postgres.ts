import { Sequelize, DataTypes, Model } from "sequelize";
import logger from "../libraries/logger";
import customConfig from "../config/default";

const POSTGRES_URL = customConfig.dbUri;
const sequelizeConnection = new Sequelize(POSTGRES_URL, {
  dialect: 'postgres'
});

async function connectDB() {
  try {
    await sequelizeConnection.authenticate();
    logger.info("✅ Database Connection has been successfully established.");
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
  }
}

export { connectDB, sequelizeConnection, Sequelize, DataTypes };