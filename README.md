# Express TypeScript API Boilerplate

A production-ready API boilerplate using Express.js and TypeScript, featuring robust validation, error handling, logging, and monitoring.

## Features

### Core Technologies
- **Node.js 22+** - Latest LTS version
- **TypeScript** - Modern JavaScript with type safety
- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL** - Scalable, relational database
- **Knex.js** - SQL query builder with migrations

### Security
- **Helmet** - Secure HTTP headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Throttling API requests
- **Zod Validation** - Input validation and schema enforcement
- **Strict TypeScript Configuration** - Type safety enforcement

### Error Handling & Validation
- Route-specific validation schemas
- Custom validation rules per endpoint
- Centralized error handling with detailed responses
- Type-safe request validation

### Monitoring & Logging
- **Sentry** - Error tracking and performance monitoring
- **Better Stack** - Advanced logging and monitoring
- **Pino** - High-performance structured logging
- Environment-based log levels

### Development Tools
- **ESLint** - Code linting with custom rules
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Husky** - Git hooks for CI/CD
- **Docker** - Containerized deployment
- **Docker Compose** - Multi-container orchestration

## Prerequisites

Ensure you have the following installed:
- Node.js 22+
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose (optional)

## Setup

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/express_ts_db
REDIS_URL=redis://localhost:6379
SENTRY_DSN=your-sentry-dsn
BETTER_STACK_TOKEN=your-betterstack-token
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd express-typescript-api-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run database migrations:
   ```bash
   npm run migrate
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Using Docker
```bash
docker-compose up -d
```

## API Validation

### Route-Based Validation
Each route has a validation schema in `src/validations`:

```typescript
export const createUserSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    role: z.enum(['user', 'admin']),
  }),
});
```

### Validation Middleware
The `validate` middleware enforces schema validation:

```typescript
router.post('/', validate(createUserSchema), userController.createUser);
```

## Error Handling
- Custom error classes
- Centralized error responses
- Sentry error tracking
- Development/production error details

## Monitoring & Logging

### Sentry
- Performance monitoring
- Error tracking
- Request tracing
- Node.js profiling

### Better Stack
- Structured logging
- Log aggregation
- Production monitoring
- Custom log transport

## Testing
Run tests:
```bash
npm test    # Run all tests
npm run test:watch  # Watch mode
```

## Code Quality

### Linting
```bash
npm run lint     # Check linting
npm run lint:fix # Auto-fix linting issues
```

### Type Checking
```bash
npm run typecheck
```

## Database Migrations

```bash
npm run migrate:make migration_name  # Create a new migration
npm run migrate                      # Apply migrations
npm run seed:make seed_name          # Create a new seed
npm run seed                         # Run seeds
```

## Project Structure

```
src/
├── config/        # Configuration files
├── controllers/   # Route controllers
├── database/      # Migrations and seeds
├── middlewares/   # Express middlewares
├── models/        # Data models
├── routes/        # API route definitions
├── services/      # Business logic
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── validations/   # Request validation schemas
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

