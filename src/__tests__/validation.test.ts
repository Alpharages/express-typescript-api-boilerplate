import { validateInput, formatAmount } from '../utils/validation';

describe('Input Validation', () => {
  describe('Email Validation', () => {
    it('should accept valid email', () => {
      const result = validateInput({ email: 'user@domain.com', amount: 100 });
      expect(result.isValid).toBe(true);
      expect(result.data?.email).toBe('user@domain.com');
    });

    it('should reject missing email', () => {
      const result = validateInput({ amount: 100 });
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].field).toBe('email');
    });

    it('should reject invalid email format', () => {
      const result = validateInput({ email: 'invalid-email', amount: 100 });
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].field).toBe('email');
    });
  });

  describe('Amount Validation', () => {
    it('should accept valid amount', () => {
      const result = validateInput({ email: 'user@domain.com', amount: 123.45 });
      expect(result.isValid).toBe(true);
      expect(result.data?.amount).toBe(123.45);
    });

    it('should reject negative amount', () => {
      const result = validateInput({ email: 'user@domain.com', amount: -100 });
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].field).toBe('amount');
    });

    it('should reject amount with more than 2 decimal places', () => {
      const result = validateInput({ email: 'user@domain.com', amount: 100.123 });
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].field).toBe('amount');
    });

    it('should reject amount exceeding maximum', () => {
      const result = validateInput({ email: 'user@domain.com', amount: 1000000000 });
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].field).toBe('amount');
    });
  });

  describe('Amount Formatting', () => {
    it('should format amount with thousand separators and 2 decimal places', () => {
      expect(formatAmount(1234567.89)).toBe('1,234,567.89');
      expect(formatAmount(1000)).toBe('1,000.00');
      expect(formatAmount(123.4)).toBe('123.40');
    });
  });
});