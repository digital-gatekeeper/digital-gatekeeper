import express, { Express, IRouter, Request, Response } from 'express';
import { createClient } from 'redis';

const router: IRouter = express.Router();

router.get('/test', (req: Request, res: Response) => {
   res.send({data: 'test'});
});

module.exports = router;