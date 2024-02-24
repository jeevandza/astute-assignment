import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoute, purchaseOrderRoute, productRoute } from "@Routes/index.ts";
import { Logger } from "@Utils";
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
 * Routers
 */
app.use("/v1", userRoute());
app.use("/v1", purchaseOrderRoute());
app.use("/v1", productRoute());

/**
 * Express listening on port and control
 */
app.listen(PORT, () => {
  console.log(`Server listing at ${PORT}`);
  Logger.info("g");
});
