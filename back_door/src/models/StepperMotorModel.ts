import { RedisClientType } from 'redis';

interface MotorData {
  id: string;
  pins: number[];
  doorNumber: number;
}

/**
 * Class representing a Stepper Motor Model.
 */
class StepperMotorModel {
  private client: RedisClientType;

  /**
   * Create a new instance of the StepperMotorModel class.
   * @param {RedisClientType} client - The Redis client.
   */
  constructor(client: RedisClientType) {
    this.client = client;
  }

  /**
   * Create a new motor.
   * @param {MotorData} motorData - The motor data.
   * @returns {Promise<void>} A promise that resolves when the motor is created.
   * @throws {Error} If the motor is not created.
   */
  async create(motorData: MotorData): Promise<void> {
    try {
      const motorDataJSON = JSON.stringify(motorData)
      const motor = await this.client.set(
        `motor:${motorData.id}`, motorDataJSON
      )

      if (!motor) {
        throw new Error('Motor not created');
      }

    } catch (error: any) {
      console.log(error.message);
    }
  }

  /**
   * Update an existing motor.
   * @param {MotorData} motorData - The motor data.
   * @returns {Promise<void>} A promise that resolves when the motor is updated.
   * @throws {Error} If the motor is not updated.
   */
  async update(motorData: MotorData): Promise<void> {
    try {
      const motorDataJSON = JSON.stringify(motorData)
      const motor = await this.client.set(
        `motor:${motorData.id}`, motorDataJSON
      )

      if (!motor) {
        throw new Error('Motor not created');
      }

    } catch (error: any) {
      console.log(error.message);
    }
  }

  /**
   * Delete a motor by its ID.
   * @param {number} id - The ID of the motor to delete.
   * @returns {Promise<void>} A promise that resolves when the motor is deleted.
   */
  async delete(id: number): Promise<void> {
    const fieldsDeleted = await this.client.del(`motor:${id}`);
  }

  /**
   * Read a motor by its ID.
   * @param {number} id - The ID of the motor to read.
   * @returns {Promise<any>} A promise that resolves with the motor data.
   * @throws {Error} If no data is found for the motor.
   */
  async read(id: number) {
    try {
      const motor = await this.client.get(`motor:${id}`);

      if (!motor) {
        throw new Error('No data for the motor');
      }

      return JSON.parse(motor);
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default StepperMotorModel;