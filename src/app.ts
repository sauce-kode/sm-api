require("dotenv").config()
import express, { Request, Response, Application } from "express"
import morgan from "morgan"
import customConfig from "./config/default"
import { connectDB, sequelizeConnection } from "./database/postgres"
import logger from "./libraries/logger"
import appRouter from "./components"
import dbInit from "./database/init"

const PORT = customConfig.port

export const get = () => {
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
    return app
}

export const start = () => {
    const app = get()
    try {
        app.listen(PORT, async () => {
            logger.info("🚀 Server started Successfully")
            await connectDB()
            await dbInit()
        })
    } catch (error) {
        logger.info(`An error occured ${error}`)
    }
}

start()

