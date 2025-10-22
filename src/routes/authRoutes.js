// src/routes/authRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const routerUser = Router();

routerUser.post('/auth/register', celebrate(registerUserSchema), registerUser);
routerUser.post('/auth/login', celebrate(loginUserSchema), loginUser);
routerUser.post('/auth/logout', logoutUser);
routerUser.post('/auth/refresh', refreshUserSession);

export default routerUser;
