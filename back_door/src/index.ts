import express, { Express, Request, Response } from 'express';

const routes = require ('./routes/index');
const app: Express = express();
const port: number = 8000;

app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})