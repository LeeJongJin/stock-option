import * as express from "express";
export const indexRouter = express.Router();

indexRouter.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello express");
});

indexRouter.get("/test", (req: express.Request, res: express.Response) => {
  res.send("hello express test");
});
