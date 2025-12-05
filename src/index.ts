import express from "express";
import { PORT } from "./utils/env-util";

import { errorMiddleware } from "./middlewares/error-middleware";
import { router } from "./routes/routes";
import { routeNotFound } from "./utils/route-util";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);
app.use(routeNotFound)

app.listen(PORT || 3000, () => {
  console.log(`Listening at port ${PORT}`);
});