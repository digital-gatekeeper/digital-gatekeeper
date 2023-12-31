import express, { Express, Request, Response } from 'express';

const index = require('./routes/index');
const bodyParser = require('body-parser');
const app: Express = express();
const port: number = 8000;
const cors = require('cors');

app.use(express.json());
app.use('/', index);
app.use(cors());

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})