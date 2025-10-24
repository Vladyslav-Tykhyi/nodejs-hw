import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const routerUser = Router();

routerUser.patch(
  '/users/me/avatar',
  authenticate,
  // Додаємо після авторизації, але до контролера
  upload.single('avatar'),
  updateUserAvatar,
);

export default routerUser;
