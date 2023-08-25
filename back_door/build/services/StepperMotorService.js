"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const StepperMotorModel_1 = __importDefault(require("../models/StepperMotorModel"));
const redisService_1 = __importDefault(require("../services/redisService"));
class StepperMotorService {
    constructor() {
        this.stepCounter = 0;
        this.stepCount = 8;
        this.Seq = [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
            [1, 0, 0, 1]
        ];
        this.model = new StepperMotorModel_1.default(redisService_1.default);
    }
    createMotor(motorData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create(motorData);
        });
    }
    updateMotor(motorData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.update(motorData);
        });
    }
    deleteMotor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.delete(id);
        });
    }
    readMotor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const motor = yield this.model.read(id);
            return motor;
        });
    }
    rotateClockwise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const motorData = yield this.model.read(id);
            console.log(motorData);
            if (motorData) {
                const pins = motorData.pins.map((pin) => new onoff_1.Gpio(pin, 'out'));
                for (let pin = 0; pin < 4; pin++) {
                    if (this.Seq[this.stepCounter][pin] != 0) {
                        pins[pin].writeSync(1);
                        console.log(pins[pin]);
                    }
                    else {
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
        });
    }
    rotateCounterClockwise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const motorData = yield this.model.read(id);
            if (motorData) {
                const pins = motorData.pins.split(',').map((pin) => new onoff_1.Gpio(pin, 'out'));
                for (let pin = 0; pin < 4; pin++) {
                    if (this.Seq[this.stepCounter][pin] != 0) {
                        pins[pin].writeSync(0);
                    }
                    else {
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
        });
    }
}
exports.default = StepperMotorService;
