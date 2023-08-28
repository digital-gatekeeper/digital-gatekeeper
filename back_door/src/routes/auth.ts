import express, { IRouter, Request, Response } from 'express';
import AuthService from '../services/UserService';

const router: IRouter = express.Router();

router.post('/login', AuthService.login);

module.exports = router;