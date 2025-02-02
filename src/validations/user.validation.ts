import { z } from 'zod';

// Common validation rules
const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name cannot exceed 100 characters')
  .regex(/^[a-zA-Z\s-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(5, 'Email must be at least 5 characters')
  .max(255, 'Email cannot exceed 255 characters')
  .transform((email) => email.toLowerCase());

// Create user validation
export const createUserSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    role: z.enum(['user', 'admin'], {
      errorMap: () => ({ message: 'Role must be either "user" or "admin"' }),
    }).default('user'),
  }),
  query: z.object({}),
  params: z.object({}),
});

// Update user validation
export const updateUserSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    role: z.enum(['user', 'admin']).optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  }),
  query: z.object({}),
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
});

// Search users validation
export const searchUsersSchema = z.object({
  body: z.object({}),
  query: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    page: z.string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1))
      .pipe(z.number().positive('Page must be a positive number')),
    limit: z.string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10))
      .pipe(z.number().min(1).max(100)),
    sortBy: z.enum(['name', 'email', 'createdAt']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
  params: z.object({}),
});

// Get user by ID validation
export const getUserSchema = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
});