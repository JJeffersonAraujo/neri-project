import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { adaptController } from '../../../shared/adapters/expressControllerAdapter';
import { EnsureAuth } from '../../../shared/decorators/EnsureAuth';

const router = Router();
const controller = new UserController();

router.post(
  '/',
  adaptController(controller, 'create')
);

router.get(
  '/profile',
  EnsureAuth,
  adaptController(controller, 'profile')
);

export { router as userRoutes };
