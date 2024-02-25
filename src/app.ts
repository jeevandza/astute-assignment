import express from "express";
import cors from "cors";
import "dotenv/config";
import { Logger, Helpers } from "@Utils"; // Assuming Logger and Helpers are exported correctly
import { Request, Response, NextFunction } from "express";
import dbInit from "@Database/init";
import {
  userRoute,
  purchaseOrderRoute,
  productRoute,
  returnOrderRoute,
  authRoute,
} from "@Routes/index.ts";

/**
 * Initializes db as soon as server starts running, initially creates tables based on schema created.
 * You can run below func but to prevent conflicts only run bellow if you are ready to start development as this created tables based on your models created and 
 * syn'd to PG
 */

// dbInit();

/**
 * Server running port and express configuration
 */
const PORT = process.env.PORT || 3030;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Create a middleware to log requests
 */
const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  Logger.info(`${req.method} ${req.url}`);
  next();
};

/**
 * Skip token verification for login, signup, and users routes
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path !== "/v1/login" && req.path !== "/v1/signup" && req.path !== "/v1/users") {
    Helpers.verifyToken(req, res, next);
  } else {
    next();
  }
});

/**
 * Routers
 */
app.use("/v1", userRoute());
app.use("/v1", purchaseOrderRoute());
app.use("/v1", productRoute());
app.use("/v1", returnOrderRoute());
app.use("/v1", authRoute());

/**
 * Create a middleware to log errors
 */
const errorLoggerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  Logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next(err);
};

/**
 * Error handling middleware - should be defined after routes
 */
app.use(errorLoggerMiddleware);
app.use(requestLoggerMiddleware)

/**
 * Express listening on port and control
 */
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
