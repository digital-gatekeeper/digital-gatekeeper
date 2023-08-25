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
Object.defineProperty(exports, "__esModule", { value: true });
class DoorService {
    constructor(stepperMotor) {
        this.create = (req, res) => {
            try {
                const motorData = {
                    id: req.body.doorId,
                    pins: req.body.pins,
                    doorNumber: parseInt(req.body.doorId)
                };
                this.stepperMotor.createMotor(motorData);
                res.status(200).json({ message: "Motor created successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "An error occurred while creating the motor" });
            }
        };
        this.open = (req, res) => {
            const doorId = parseInt(req.params.id);
            this.stepperMotor.rotateClockwise(doorId);
            res.status(200).json({ success: true });
        };
        this.close = (req) => {
            const doorId = parseInt(req.params.id);
            this.stepperMotor.rotateCounterClockwise(doorId);
        };
        this.stepperMotor = stepperMotor;
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const motor = yield this.stepperMotor.readMotor(id);
                if (!motor) {
                    res.status(404).json({ success: false, error: 'Door not found' });
                    return;
                }
                res.status(200).json({ success: true, data: motor });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to retrieve door data" });
            }
        });
    }
}
exports.default = DoorService;
