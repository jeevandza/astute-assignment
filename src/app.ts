import express from "express";
import cors from "cors";
import "dotenv/config";
import {
  userRoute,
  purchaseOrderRoute,
  productRoute,
  returnOrderRoute,
  authRoute,
} from "@Routes/index.ts";
import { Logger, Helpers } from "@Utils";
import { Request, Response, NextFunction } from "express";
import dbInit from "@Database/init";

/**
 * Initializes db as soon as server stars running, initially creates tables based on schema created
 */
dbInit();

/**
 * Server running port and express configuration
 */
const PORT = process.env.PORT || 3030;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Skip the token verification for login and signup routes
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
 * Express listening on port and control
 */
app.listen(PORT, () => {
  console.log(`Server listing at ${PORT}`);
  Logger.info("g");
});
