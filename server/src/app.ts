import * as cors from "cors";
import * as express from "express";

import { indexRouter } from "./routes";
import { financeRouter } from "./routes/finance";

const port: number = 3000;
const app: express.Application = express();

//cors 
app.use(cors({ origin: true, credentials: true }));

//Router
app.use("/", indexRouter);
app.use("/finance", financeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
