import * as express from "express";
export const financeRouter = express.Router();

import { getAllStocks, getDaySise } from "../api/finance";

financeRouter.get("/", async (req: express.Request, res: express.Response) => {
  const data = "HELLO WORLD!";
  res.send(data);
});

financeRouter.get("/stocks", async (req: express.Request, res: express.Response) => {
    const data = await getAllStocks();
    res.send(data);
  }
);

financeRouter.get("/code", async (req: express.Request, res: express.Response) => {
    const data = await getDaySise(323410);
    res.send(data);
  }
);
