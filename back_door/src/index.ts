import express, { Express } from 'express';

const index = require('./routes/index');
const auth = require('./routes/auth');
const bodyParser = require('body-parser');
const app: Express = express();
const port: number = 8000;

app.use(express.json());
app.use('/', index);
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})