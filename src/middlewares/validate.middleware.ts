import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, z } from 'zod';
import { logger } from '../utils/logger';

export interface ValidatedRequest<T> extends Request {
  validated: z.infer<T>;
}

export const validate = <T extends AnyZodObject>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      (req as ValidatedRequest<T>).validated = validatedData;
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn({ error }, 'Validation error');
        return res.status(400).json({
          status: 400,
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
            code: err.code,
          })),
        });
      }
      return next(error);
    }
  };
};