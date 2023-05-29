require("dotenv").config()
import express, { Request, Response, Application } from "express"
import morgan from "morgan"
import appRouter from "./src/components"
import { connectDB, sequelizeConnection } from "./src/database/postgres"
import logger from "./src/libraries/logger"
import customConfig from "./src/config/default"

const app: Application = express()
const PORT = customConfig.port

app.use(express.json({limit: "10kb"}))
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Social Media REST API",
  })
})

app.use("/api", appRouter)

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Route: ${req.originalUrl} does not exist on this server`,
  })
})

app.listen(PORT, async () => {
  logger.info("🚀 Server started Successfully")
  await connectDB()
  await 
  sequelizeConnection.sync({force: false}).then(() => {
    logger.info("🚀 Database synced Successfully")
  })
})

process.on('uncaughtException', reason => {
  logger.info(`An error occured ${reason}`)
  throw reason;
});
