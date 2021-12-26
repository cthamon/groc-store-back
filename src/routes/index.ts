import express from 'express';

import user from './userRoute';
import product from './productRoute';

const routes = express();

routes.use("/user", user);
routes.use("/product", product);

export default routes;