import express from "express";
import cors from 'cors';
import "dotenv/config";
import { roleRoute, userRoute } from "@Routes/index.ts";
import { Logger} from '@Utils'


const PORT = process.env.PORT || 3030;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/v1", userRoute());
app.use("/v1", roleRoute());

app.listen(PORT, () => {
  console.log(`Server listing at ${PORT}`);
  Logger.info('g')
});
