import { z } from 'zod';

// Custom error map for friendly error messages
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case 'invalid_string':
      if (issue.validation === 'email') {
        return { message: 'Please enter a valid email address (e.g., user@domain.com)' };
      }
      break;
    case 'invalid_type':
      if (ctx.defaultError === 'Required') {
        return { message: `${issue.path[0]} is required` };
      }
      break;
    default:
      return { message: ctx.defaultError };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

// Format amount with thousand separators and 2 decimal places
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Validation schema
export const inputSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format')
    .min(1, 'Email cannot be empty')
    .refine((email) => {
      const [localPart, domain] = email.split('@');
      return (
        localPart &&
        domain &&
        domain.includes('.') &&
        domain.split('.').every((part) => part.length > 0)
      );
    }, 'Email must have a valid domain with proper format'),

  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive('Amount must be greater than 0')
    .max(999999999.99, 'Amount cannot exceed 999,999,999.99')
    .transform((val) => Number(val.toFixed(2))) // Ensure 2 decimal places
    .refine(
      (val) => {
        const decimals = val.toString().split('.')[1]?.length || 0;
        return decimals <= 2;
      },
      {
        message: 'Amount cannot have more than 2 decimal places',
      },
    ),
});

export type ValidInput = z.infer<typeof inputSchema>;

interface ValidationResult {
  isValid: boolean;
  data?: ValidInput;
  errors?: Array<{
    field: string;
    message: string;
    fix: string;
  }>;
}

export const validateInput = (input: unknown): ValidationResult => {
  try {
    const validatedData = inputSchema.parse(input);
    return {
      isValid: true,
      data: {
        ...validatedData,
        amount: Number(validatedData.amount.toFixed(2)), // Ensure 2 decimal places
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err) => ({
          field: String(err.path[0]),
          message: err.message,
          fix: getFixSuggestion(String(err.path[0]), err.message),
        })),
      };
    }
    throw error;
  }
};

function getFixSuggestion(field: string, error: string): string {
  if (field === 'email') {
    if (error.includes('required')) {
      return 'Please provide an email address';
    }
    return 'Enter a valid email address in the format user@domain.com';
  }

  if (field === 'amount') {
    if (error.includes('required')) {
      return 'Please provide an amount';
    }
    if (error.includes('positive')) {
      return 'Enter an amount greater than 0';
    }
    if (error.includes('decimal places')) {
      return 'Enter an amount with maximum 2 decimal places (e.g., 123.45)';
    }
    if (error.includes('exceed')) {
      return 'Enter an amount less than or equal to 999,999,999.99';
    }
    return 'Enter a valid numeric amount (e.g., 1234.56)';
  }

  return 'Please check the input requirements and try again';
}