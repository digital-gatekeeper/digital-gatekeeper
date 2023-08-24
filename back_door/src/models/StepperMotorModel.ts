import client from '../services/redisService';

interface MotorData {
    id: string;
    pins: number[];
    doorNumber: number;
}

class StepperMotorModel {
    async create(motorData: MotorData): Promise<void> {
        const fieldsAdded = await client.hSet(
            `motor:${motorData.id}`,
            {
                'id': motorData.id,
                'pins': JSON.stringify(motorData.pins),
                'doorNumber': motorData.doorNumber.toString()
            },
        )
    }

    async update(motorData: MotorData): Promise<void> {
        const fieldsUpdated = await client.hSet(
            `motor:${motorData.id}`,
            {
                'id': motorData.id,
                'pins': JSON.stringify(motorData.pins),
                'doorNumber': motorData.doorNumber.toString()
            },
        )
    }

    async delete(id: number): Promise<void> {
        const fieldsDeleted = await client.del(`motor:${id}`);
    }

    async read(id: number) {
        const motor = await client.hGetAll(`motor:${id}`);
        motor.pins = JSON.parse(motor.pins);
        return motor;
    }
}

export default StepperMotorModel;