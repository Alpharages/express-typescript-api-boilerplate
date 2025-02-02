import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { validate } from '../middlewares/validate.middleware';
import {
  createUserSchema,
  updateUserSchema,
  searchUsersSchema,
  getUserSchema,
} from '../validations/user.validation';

const router = Router();
const userController = new UserController(new UserService());

router.post(
  '/',
  validate(createUserSchema),
  userController.createUser,
);

router.get(
  '/',
  validate(searchUsersSchema),
  userController.searchUsers,
);

router.get(
  '/:id',
  validate(getUserSchema),
  userController.getUserById,
);

router.put(
  '/:id',
  validate(updateUserSchema),
  userController.updateUser,
);

export const userRoutes = router;