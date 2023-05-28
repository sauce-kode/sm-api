require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";
import logger from "../libraries/logger";
import customConfig from "../config/default";

const POSTGRES_URL = customConfig.dbUri;
const sequelize = new Sequelize(POSTGRES_URL, {
  logging: false
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info("✅ Database Connection has been successfully established.");
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };