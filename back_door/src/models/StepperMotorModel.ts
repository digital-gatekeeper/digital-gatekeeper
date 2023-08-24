import { RedisClientType } from 'redis';

interface MotorData {
  id: string;
  pins: number[];
  doorNumber: number;
}

class StepperMotorModel {
  private client: RedisClientType;

  constructor(client: RedisClientType) {
    this.client = client;
  }

  async create(motorData: MotorData): Promise<void> {
    try {
      const motorDataJSON = JSON.stringify(motorData)
      const motor = await this.client.set(
        `motor:${motorData.id}`, motorDataJSON
      )
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async update(motorData: MotorData): Promise<void> {
   
  }

  async delete(id: number): Promise<void> {
    const fieldsDeleted = await this.client.del(`motor:${id}`);
  }

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