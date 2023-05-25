require("dotenv").config();
import express, { Request, Response } from "express";
import morgan from "morgan";
import Logger from "./src/libraries/logger";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Social Media REST API",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Route: ${req.originalUrl} does not exist on this server`,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  Logger.info("🚀 Server started Successfully");
});
