import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send("Token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {

  }

  next();
}

export default authentication;