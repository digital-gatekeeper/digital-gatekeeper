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

  create = (req: Request) => {
    const motorData: MotorData = {
      id: req.params.id,
      pins: req.params.pins.split(',').map(pin => parseInt(pin)),
      doorNumber: parseInt(req.params.doorNumber)
    };

    this.stepperMotor.createMotor(motorData);
  }

  read = (id: number) => {
    this.stepperMotor.readMotor(id);
  }

  open = (req: Request) => {
    const doorId: number = parseInt(req.params.id);
    this.stepperMotor.rotateClockwise(doorId);
  }

  close = (req: Request) => {
    const doorId: number = parseInt(req.params.id);
    this.stepperMotor.rotateCounterClockwise(doorId);
  }
}

export default DoorService;