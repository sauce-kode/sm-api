require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";
import Logger from "../libraries/logger";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;
const sequelize = new Sequelize(POSTGRES_URL);

async function connectDB() {
  try {
    await sequelize.authenticate();
    Logger.info("✅ Database Connection has been successfully established.");
  } catch (error) {
    Logger.error(`Unable to connect to the database: ${error}`);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };
