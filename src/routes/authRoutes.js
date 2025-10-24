// src/routes/authRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const routerAuth = Router();

routerAuth.post('/auth/register', celebrate(registerUserSchema), registerUser);
routerAuth.post('/auth/login', celebrate(loginUserSchema), loginUser);
routerAuth.post('/auth/logout', logoutUser);
routerAuth.post('/auth/refresh', refreshUserSession);
routerAuth.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
routerAuth.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default routerAuth;
