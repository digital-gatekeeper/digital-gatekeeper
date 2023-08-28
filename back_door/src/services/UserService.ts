import { Request, Response } from 'express';

class AuthService {
  static login(req: Request, res: Response) {
    const {username, password} = req.body;
    res.status(200).json({ success: true });
  }
}

export default AuthService;