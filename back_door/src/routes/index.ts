import express, { IRouter, Request, Response } from 'express';
import DoorService from '../services/DoorService';
import StepperMotorService from '../services/StepperMotorService';
import authentication from '../middlewares/authenticate';

const router: IRouter = express.Router();
const stepperMotor = new StepperMotorService();
const door: DoorService = new DoorService(stepperMotor);

router.get('/doors/:id/open', door.open);
router.get('/doors/:id/close', door.close);
router.post('/doors/create', door.create);
router.get('/doors/:id', authentication, async (req: Request, res: Response) => {
    await door.read(req, res);
});

module.exports = router;