import { Request, Response } from 'express';
import StepperMotorService from './StepperMotorService';

interface MotorData {
  id: string;
  pins: number[];
  doorNumber: number;
}

class DoorService {
  private stepperMotor: StepperMotorService;

  constructor(stepperMotor: StepperMotorService) {
    this.stepperMotor = stepperMotor;
  }

  create = (req: Request, res: Response) => {
    try {
      const motorData: MotorData = {
        id: req.body.doorId,
        pins: req.body.pins,
        doorNumber: parseInt(req.body.doorId)
      };

      this.stepperMotor.createMotor(motorData);

      res.status(200).json({ message: "Motor created successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating the motor" });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const motor = await this.stepperMotor.readMotor(id);

      if (!motor) {
        res.status(404).json({ success: false, error: 'Door not found' });
        return;
      }

      res.status(200).json({ success: true, data: motor });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve door data" });
    }
  }

  open = (req: Request, res: Response) => {
    const doorId: number = parseInt(req.params.id);
    this.stepperMotor.rotateClockwise(doorId);
    res.status(200).json({ success: true });
  }

  close = (req: Request) => {
    const doorId: number = parseInt(req.params.id);
    this.stepperMotor.rotateCounterClockwise(doorId);
  }
}

export default DoorService;