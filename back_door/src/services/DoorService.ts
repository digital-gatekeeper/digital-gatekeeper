import { Request, Response } from 'express';

const DoorService = {
  open: (req: Request, res: Response) => {
    const doorId = req.params.id;
    res.send({ door: doorId});
  },

  close: () => {

  }
}

module.exports = DoorService;