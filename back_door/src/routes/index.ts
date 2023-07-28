import express, { IRouter, Request, Response } from 'express';
const DoorService = require('../services/DoorService');

const router: IRouter = express.Router();

router.get('/test', (req: Request, res: Response) => {
  res.send({ data: 'test' });
});

router.get('/doors/:id/open', DoorService.open);

module.exports = router;