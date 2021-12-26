import express from 'express';
import cors from 'cors';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000',]
}));

app.use(express.json());

app.use("/api", routes);
app.use('/static', express.static('public'));

app.use(errorHandler);

export default app;