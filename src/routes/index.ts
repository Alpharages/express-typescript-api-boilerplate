import { Router } from 'express';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/users', userRoutes);

export const routes = router;