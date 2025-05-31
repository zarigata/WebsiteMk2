/**
 * Form validation utilities
 * Provides reusable validation functions for form fields
 */

import { ValidationRule } from '@/types/common';

/**
 * Create a validation rule that checks if a field has a value
 */
export const required = (message = 'This field is required'): ValidationRule => ({
  required: message,
});

/**
 * Create a validation rule that checks if a field meets a minimum length
 */
export const minLength = (min: number, message?: string): ValidationRule => ({
  minLength: {
    value: min,
    message: message || `Must be at least ${min} characters`,
  },
});

/**
 * Create a validation rule that checks if a field is under a maximum length
 */
export const maxLength = (max: number, message?: string): ValidationRule => ({
  maxLength: {
    value: max,
    message: message || `Must be at most ${max} characters`,
  },
});

/**
 * Create a validation rule that checks if a field matches a regular expression pattern
 */
export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  pattern: {
    value: regex,
    message,
  },
});

/**
 * Create a validation rule that checks if a field is a valid email address
 */
export const email = (message = 'Please enter a valid email address'): ValidationRule => ({
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message,
  },
});

/**
 * Create a validation rule that checks if a field is a valid URL
 */
export const url = (message = 'Please enter a valid URL'): ValidationRule => ({
  pattern: {
    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
    message,
  },
});

/**
 * Create a validation rule that checks if a field is a number
 */
export const number = (message = 'Please enter a valid number'): ValidationRule => ({
  valueAsNumber: true,
  validate: (value) => !isNaN(Number(value)) || message,
});

/**
 * Create a validation rule that checks if a field is within a numeric range
 */
export const range = (
  min: number,
  max: number,
  message?: string
): ValidationRule => ({
  min: {
    value: min,
    message: message || `Must be between ${min} and ${max}`,
  },
  max: {
    value: max,
    message: message || `Must be between ${min} and ${max}`,
  },
});

/**
 * Create a validation rule that checks if a field matches another field's value
 */
export const matchField = (
  fieldName: string,
  message: string
): ValidationRule => ({
  validate: (value, values) => 
    value === values[fieldName] || message,
});

/**
 * Create a validation rule that checks if a field contains at least one number
 */
export const containsNumber = (message = 'Must contain at least one number'): ValidationRule => ({
  pattern: {
    value: /\d/,
    message,
  },
});

/**
 * Create a validation rule that checks if a field contains at least one uppercase letter
 */
export const containsUppercase = (message = 'Must contain at least one uppercase letter'): ValidationRule => ({
  pattern: {
    value: /[A-Z]/,
    message,
  },
});

/**
 * Create a validation rule that checks if a field contains at least one special character
 */
export const containsSpecialChar = (
  message = 'Must contain at least one special character',
  specialChars = '!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~`'
): ValidationRule => {
  const escaped = specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return {
    pattern: {
      value: new RegExp(`[${escaped}]`),
      message,
    },
  };
};

/**
 * Create a validation rule that checks if a field is a valid date
 */
export const date = (message = 'Please enter a valid date'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Let required handle empty values
    const date = new Date(value);
    return !isNaN(date.getTime()) || message;
  },
});

/**
 * Create a validation rule that checks if a date is in the future
 */
export const futureDate = (message = 'Date must be in the future'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Let required handle empty values
    const date = new Date(value);
    return date > new Date() || message;
  },
});

/**
 * Create a validation rule that checks if a date is in the past
 */
export const pastDate = (message = 'Date must be in the past'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Let required handle empty values
    const date = new Date(value);
    return date < new Date() || message;
  },
});

/**
 * Create a validation rule that checks if a field is a valid phone number
 */
export const phone = (message = 'Please enter a valid phone number'): ValidationRule => ({
  pattern: {
    value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
    message,
  },
});

/**
 * Create a validation rule that checks if a field is a valid password
 */
export const password = (
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireNumber?: boolean;
    requireSpecialChar?: boolean;
    customMessage?: string;
  } = {}
): ValidationRule => {
  const {
    minLength: minLen = 8,
    requireUppercase = true,
    requireNumber = true,
    requireSpecialChar = true,
    customMessage,
  } = options;

  const messages: string[] = [];
  const patterns: { value: RegExp; message: string }[] = [];

  if (minLen > 0) {
    messages.push(`at least ${minLen} characters`);
    patterns.push({
      value: new RegExp(`.{${minLen},}`),
      message: `Must be at least ${minLen} characters`,
    });
  }

  if (requireUppercase) {
    messages.push('one uppercase letter');
    patterns.push({
      value: /[A-Z]/,
      message: 'Must contain at least one uppercase letter',
    });
  }

  if (requireNumber) {
    messages.push('one number');
    patterns.push({
      value: /\d/,
      message: 'Must contain at least one number',
    });
  }

  if (requireSpecialChar) {
    messages.push('one special character');
    patterns.push({
      value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~`]/,
      message: 'Must contain at least one special character',
    });
  }

  const defaultMessage = `Password must contain ${messages.join(', ')}`;

  return {
    pattern: patterns[0], // Use the first pattern for the built-in pattern validation
    validate: (value: string) => {
      if (!value) return true; // Let required handle empty values
      
      for (const pattern of patterns) {
        if (!pattern.value.test(value)) {
          return customMessage || pattern.message;
        }
      }
      
      return true;
    },
  };
};

/**
 * Combine multiple validation rules into a single rule
 */
export const combineValidators = (
  ...validators: (ValidationRule | undefined)[]
): ValidationRule => {
  return {
    validate: (value: any, values: any) => {
      for (const validator of validators) {
        if (!validator) continue;
        
        if (typeof validator === 'function') {
          const result = validator(value, values);
          if (result !== true) return result;
        } else if (validator.validate) {
          const result = validator.validate(value, values);
          if (result !== true) return result;
        }
      }
      return true;
    },
  };
};
