import { Gpio } from 'onoff';
import StepperMotorModel from "../models/StepperMotorModel";
import client from '../services/redisService';

interface MotorData {
  id: number;
  pins: number[];
  doorNumber: number;
  status: string;
}

/**
 * Service for controlling stepper motors.
 */
class StepperMotorService {
  private static instance: StepperMotorService | null = null;
  private stepPerRevolution: number = 4076;
  private model: StepperMotorModel;
  private delayBetweenStep: number = 0.005;
  private stepCounter: number = 0;
  private maxSteps: number = 8;
  private isRunning: boolean = false;
  private seq: number[][] = [
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

  static getInstance(): StepperMotorService {
    if (!this.instance) {
      this.instance = new StepperMotorService();
    }
    return this.instance;
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
   * Get the status of a motor.
   * @param id - The ID of the motor to get the status of.
   * @returns The status of the motor.
   */
  async getStatus(id: number) {
    const status = await this.model.getStatus(id);
    return status;
  }

  /**
   * Rotate the motor clockwise.
   * @param id - The ID of the motor to rotate.
   */
  async rotateClockwise(id: number): Promise<boolean> {
    if (this.isRunning) {
      return false;
    }

    const motorData = await this.model.read(id);

    if (motorData && motorData.status === 'closed') {
      this.isRunning = true;
      const pins: Gpio[] = motorData.pins.map(
        (pin: number) => new Gpio(pin, 'out')
      );

      for (let i = 0; i < this.stepPerRevolution; i++) {
        this.setStep(pins);

        this.stepCounter++;
        if (this.stepCounter == this.maxSteps) {
          this.stepCounter = 0;
        }

        await new Promise(resolve => setTimeout(resolve, this.delayBetweenStep));
      }

      this.stop(pins);
      this.isRunning = false;
      this.model.setStatus(id, 'opened');
    }

    return true;
  }

  /**
   * Rotate the motor counter-clockwise.
   * @param id - The ID of the motor to rotate.
   */
  async rotateCounterClockwise(id: number): Promise<boolean> {
    if (this.isRunning) {
      return false;
    }

    const motorData = await this.model.read(id);

    if (motorData && motorData.status === 'opened') {
      this.isRunning = true;
      const pins: Gpio[] = motorData.pins.map(
        (pin: number) => new Gpio(pin, 'out')
      );

      this.stepCounter = this.maxSteps - 1;

      for (let i = 0; i < this.stepPerRevolution; i++) {
        this.setStep(pins);

        this.stepCounter--;
        if (this.stepCounter < 0) {
          this.stepCounter = this.maxSteps - 1;
        }

        await new Promise(resolve => setTimeout(resolve, this.delayBetweenStep));
      }

      this.stop(pins);
      this.isRunning = false;
      this.model.setStatus(id, 'closed');
    }

    return true;
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
}

export default StepperMotorService;