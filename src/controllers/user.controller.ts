import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { logger } from '../utils/logger';
import { ValidatedRequest } from '../middlewares/validate.middleware';
import {
  createUserSchema,
  updateUserSchema,
  searchUsersSchema,
  getUserSchema,
} from '../validations/user.validation';

export class UserController {
  constructor(private userService: UserService) {}

  createUser = async (
    req: ValidatedRequest<typeof createUserSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { name, email, role } = req.validated.body;
      const user = await this.userService.create({ name, email, role });
      logger.info({ userId: user.id }, 'User created successfully');
      res.status(201).json({ status: 201, data: user });
    } catch (error) {
      next(error);
    }
  };

  searchUsers = async (
    req: ValidatedRequest<typeof searchUsersSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { page, limit, sortBy, order, ...filters } = req.validated.query;
      const users = await this.userService.findAll({
        page,
        limit,
        sortBy,
        order,
        filters,
      });
      res.json({ status: 200, data: users });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (
    req: ValidatedRequest<typeof getUserSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.validated.params;
      const user = await this.userService.findById(id);
      if (!user) {
        res.status(404).json({ status: 404, message: 'User not found' });
        return;
      }
      res.json({ status: 200, data: user });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: ValidatedRequest<typeof updateUserSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.validated.params;
      const updateData = req.validated.body;
      const user = await this.userService.update(id, updateData);
      if (!user) {
        res.status(404).json({ status: 404, message: 'User not found' });
        return;
      }
      logger.info({ userId: id }, 'User updated successfully');
      res.json({ status: 200, data: user });
    } catch (error) {
      next(error);
    }
  };
}