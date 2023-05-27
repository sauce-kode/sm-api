require("dotenv").config()
import express, { Request, Response, Application } from "express"
import morgan from "morgan"
import Logger from "./src/libraries/logger"
import appRouter from "./src/components"
import { connectDB, sequelize } from "./src/database/postgres"

const app: Application = express()

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

const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
  Logger.info("🚀 Server started Successfully")
  await connectDB()
  sequelize.sync({force: false}).then(() => {
    Logger.info("🚀 Database synced Successfully")
  })
})

process.on('unhandledRejection', reason => {
  console.error("REASON______________")
  throw reason;
});
