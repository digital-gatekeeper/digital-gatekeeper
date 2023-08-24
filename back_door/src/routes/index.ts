import express, { IRouter, Request, Response } from 'express';
import DoorService from '../services/DoorService';
import StepperMotorService from '../services/StepperMotorService';

const router: IRouter = express.Router();
const stepperMotor = new StepperMotorService();
const door: DoorService = new DoorService(stepperMotor);

router.get('/test', (req: Request, res: Response) => {
  res.send({ data: 'test' });
});

router.get('/doors/:id/open', door.open);
router.get('/doors/:id/close', door.close);
router.get('/doors/create', door.create);
router.get('/doors/read', door.read);

module.exports = router;