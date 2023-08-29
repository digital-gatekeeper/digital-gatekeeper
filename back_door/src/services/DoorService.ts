import { Request, Response } from 'express';
import StepperMotorService from './StepperMotorService';

interface MotorData {
  id: number;
  pins: number[];
  doorNumber: number;
  status: string;
}

class DoorService {
  private stepperMotor: StepperMotorService;

  constructor(stepperMotor: StepperMotorService) {
    this.stepperMotor = stepperMotor;
  }

  create = (req: Request, res: Response) => {
    try {
      const motorData: MotorData = {
        id: parseInt(req.body.doorId),
        pins: req.body.pins,
        doorNumber: parseInt(req.body.doorId),
        status: 'closed'
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
        res.status(404).json({ error: 'Door not found' });
        return;
      }

      res.status(200).json({ data: motor });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve door data" });
    }
  }

  async open(req: Request, res: Response) {
    try {
      const doorId: number = parseInt(req.params.id);
      const success: boolean = await this.stepperMotor.rotateClockwise(doorId);
      res.status(200).json({ success: success });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to open the door" });
    }

  }

  async close(req: Request, res: Response) {
    try {
      const doorId: number = parseInt(req.params.id);
      const success: boolean = await this.stepperMotor.rotateCounterClockwise(doorId);
      res.status(200).json({ success: success });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to close the door" });
    }

  }

  async status(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const status = await this.stepperMotor.getStatus(id);
      res.status(200).json({ status: status });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get the status of the door" });
    }
  }
}

export default DoorService;