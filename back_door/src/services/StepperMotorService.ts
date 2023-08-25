import { Gpio } from 'onoff';
import StepperMotorModel from "../models/StepperMotorModel";
import client from '../services/redisService';

interface MotorData {
  id: string;
  pins: number[];
  doorNumber: number;
}

class StepperMotorService {
  stepPerRevolution: number = 4076;
  // stepPerRevolution: number = 16;
  model: StepperMotorModel;
  delayBetweenStep: number = 0.005;
  stepCounter: number = 0;
  maxSteps: number = 8;
  seq: number[][] = [
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
    this.model = new StepperMotorModel(client);
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
    const motor = await this.model.read(id);
    return motor;
  }

  async rotateClockwise(id: number): Promise<void> {
    const motorData = await this.model.read(id);

    if (motorData) {
      const pins: Gpio[] = motorData.pins.map(
        (pin: number) => new Gpio(pin, 'out')
      );

      for (let i = 0; i < this.stepPerRevolution; i++) {
        console.log(`------ step ${i + 1} ------`);

        this.setStep(pins);

        this.stepCounter += 1;
        if (this.stepCounter == this.maxSteps) {
          this.stepCounter = 0;
        }

        await new Promise(resolve => setTimeout(resolve, this.delayBetweenStep));
      }

      this.stop(pins);
    }
  }

  async rotateCounterClockwise(id: number): Promise<void> {
    const motorData = await this.model.read(id);

    if (motorData) {
      const pins: Gpio[] = motorData.pins.map(
        (pin: number) => new Gpio(pin, 'out')
      );

      this.stepCounter = this.maxSteps - 1;

      for (let i = 0; i < this.stepPerRevolution; i++) {
        console.log(`------ step ${i + 1} ------`);

        this.setStep(pins);

        this.stepCounter -= 1;
        if (this.stepCounter < 0) {
          this.stepCounter = this.maxSteps - 1;
        }

        await new Promise(resolve => setTimeout(resolve, this.delayBetweenStep));
      }
    }
  }

  private setStep(pins: Gpio[]) {
    for (let pin = 0; pin < 4; pin++) {
      if (this.seq[this.stepCounter][pin] != 0) {
        pins[pin].writeSync(1);
        console.log(pin, 'is 1');
      } else {
        pins[pin].writeSync(0);
        console.log(pin, 'is 0');
      }
    }
  }

  private stop(pins: Gpio[]) {
    pins.forEach(pin => pin.writeSync(0));
  }
}

export default StepperMotorService;