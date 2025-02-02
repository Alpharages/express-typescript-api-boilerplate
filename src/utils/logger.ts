import { pino } from 'pino';
import { betterStackConfig } from '@/config/betterstack';

export const logger = pino(betterStackConfig);