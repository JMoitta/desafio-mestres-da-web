import { Router } from "express";

import productsRouter from "./products.routes";
import sessionsRouter from "./sessions.routes";
import usersRouter from "./users.routes";
import variatonsRouter from "./variations.routes";

const routes = Router();

routes.use('/variations', variatonsRouter);
routes.use('/products', productsRouter);
// routes.use('/product-variations ', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;