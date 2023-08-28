import { Gpio } from 'onoff';
import StepperMotorModel from "../models/StepperMotorModel";
import client from '../services/redisService';

interface MotorData {
  id: string;
  pins: number[];
  doorNumber: number;
}

/**
 * Service for controlling stepper motors.
 */
class StepperMotorService {
  stepPerRevolution: number = 4076;
  model: StepperMotorModel;
  delayBetweenStep: number = 0.005;
  stepCounter: number = 0;
  maxSteps: number = 8;
  pins: Gpio[] = [];
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

  /**
   * Create a new motor.
   * @param motorData - The data for the motor.
   */
  async createMotor(motorData: MotorData): Promise<void> {
    return this.model.create(motorData);
  }

  /**
   * Update an existing motor.
   * @param motorData - The updated data for the motor.
   */
  async updateMotor(motorData: MotorData): Promise<void> {
    return this.model.update(motorData);
  }

  /**
   * Delete a motor.
   * @param id - The ID of the motor to delete.
   */
  async deleteMotor(id: number): Promise<void> {
    return this.model.delete(id);
  }

  /**
   * Read a motor.
   * @param id - The ID of the motor to read.
   * @returns The motor data.
   */
  async readMotor(id: number) {
    const motor = await this.model.read(id);
    return motor;
  }

  /**
   * Rotate the motor clockwise.
   * @param id - The ID of the motor to rotate.
   */
  async rotateClockwise(id: number): Promise<void> {
    const motorData = await this.model.read(id);

    if (motorData) {
      this.setPinsToOutput(motorData);

      for (let i = 0; i < this.stepPerRevolution; i++) {
        this.setStep(this.pins);

        this.stepCounter++;
        if (this.stepCounter == this.maxSteps) {
          this.stepCounter = 0;
        }

        await new Promise(resolve => setTimeout(resolve, this.delayBetweenStep));
      }

      this.stop(this.pins);
    }
  }

  /**
   * Rotate the motor counter-clockwise.
   * @param id - The ID of the motor to rotate.
   */
  async rotateCounterClockwise(id: number): Promise<void> {
    const motorData = await this.model.read(id);

    if (motorData) {
      this.setPinsToOutput(motorData);
      this.stepCounter = this.maxSteps - 1;

      for (let i = 0; i < this.stepPerRevolution; i++) {
        this.setStep(this.pins);

        this.stepCounter--;
        if (this.stepCounter < 0) {
          this.stepCounter = this.maxSteps - 1;
        }

        await new Promise(resolve => setTimeout(resolve, this.delayBetweenStep));
      }

      this.stop(this.pins);
    }
  }

  /**
   * Set the step of the motor.
   * @param pins - The GPIO pins of the motor.
   */
  private setStep(pins: Gpio[]) {
    for (let pin = 0; pin < 4; pin++) {
      if (this.seq[this.stepCounter][pin] != 0) {
        pins[pin].writeSync(1);
      } else {
        pins[pin].writeSync(0);
      }
    }
  }

  /**
   * Stop the motor.
   * @param pins - The GPIO pins of the motor.
   */
  private stop(pins: Gpio[]) {
    pins.forEach(pin => pin.writeSync(0));
  }

  /**
   * Set the GPIO pins of the motor to output mode.
   * @param motorData - The data for the motor.
   */
  private setPinsToOutput(motorData: MotorData) {
    this.pins = motorData.pins.map(
      (pin: number) => new Gpio(pin, 'out')
    );
  }
}

export default StepperMotorService;