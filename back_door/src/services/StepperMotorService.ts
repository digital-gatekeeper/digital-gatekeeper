import { Gpio } from 'onoff';
import StepperMotorModel from "../models/StepperMotorModel";

interface MotorData {
  id: string;
  pins: number[];
  doorNumber: number;
}

class StepperMotorService {
  model: StepperMotorModel;
  stepCounter: number = 0;
  stepCount: number = 8;
  Seq: number[][] = [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1]
  ];

  constructor() {
    this.model = new StepperMotorModel();
  }

  async createMotor(motorData: MotorData): Promise<void> {
    return this.model.create(motorData);
  }

  async updateMotor(motorData: MotorData): Promise<void> {
    return this.model.update(motorData);
  }

  async deleteMotor(id: number): Promise<void> {
    return this.model.delete(id);
  }

  async readMotor(id: number) {
    return this.model.read(id);
  }

  async rotateClockwise(id: number): Promise<void> {
    const motorData = await this.model.read(id);
    const pins: Gpio[] = motorData.pins.split(',').map(
      pin => new Gpio(parseInt(pin), 'out')
    );

    for (let pin = 0; pin < 4; pin++) {
      if (this.Seq[this.stepCounter][pin] != 0) {
        pins[pin].writeSync(1);
      } else {
        pins[pin].writeSync(0);
      }
    }

    this.stepCounter += 1;
    if (this.stepCounter == this.stepCount) {
      this.stepCounter = 0;
    }
    if (this.stepCounter < 0) {
      this.stepCounter = this.stepCount;
    }
    
    setTimeout(() => this.rotateClockwise(id), 500);
  }

  async rotateCounterClockwise(id: number): Promise<void> {
    const motorData = await this.model.read(id);
    const pins: Gpio[] = motorData.pins.split(',').map(
      pin => new Gpio(parseInt(pin), 'out')
    );

    for (let pin = 0; pin < 4; pin++) {
      if (this.Seq[this.stepCounter][pin] != 0) {
        pins[pin].writeSync(0);
      } else {
        pins[pin].writeSync(1);
      }
    }

    this.stepCounter -= 1;
    if (this.stepCounter == this.stepCount) {
      this.stepCounter = 0;
    }
    if (this.stepCounter < 0) {
      this.stepCounter = this.stepCount;
    }

    setTimeout(() => this.rotateCounterClockwise(id), 500);
  }
}

export default StepperMotorService;