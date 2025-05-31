import { useState, ChangeEvent, FormEvent, useCallback } from 'react';

type ValidationRule<T> = {
  validator: (value: T[keyof T], values: T) => boolean;
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T>[];
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit: (values: T) => Promise<void> | void;
  onError?: (errors: FormErrors<T>) => void;
}

/**
 * A custom hook for handling form state, validation, and submission
 * @param options - Form configuration options
 * @returns Form state and helper methods
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
  onError,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{ [key in keyof T]?: boolean }>({});

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]): string | undefined => {
      if (!validationRules || !validationRules[name]) return undefined;

      const rules = validationRules[name] || [];
      for (const rule of rules) {
        if (!rule.validator(value, values)) {
          return rule.message;
        }
      }
      return undefined;
    },
    [validationRules, values]
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors<T> = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values]);

  // Handle input change
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const fieldName = name as keyof T;

      // Handle different input types
      let newValue: any = value;
      if (type === 'number') {
        newValue = parseFloat(value) || '';
      } else if (type === 'checkbox') {
        newValue = (e.target as HTMLInputElement).checked;
      }

      // Update field value
      setValues((prev) => ({
        ...prev,
        [fieldName]: newValue,
      }));

      // Validate field if it's been touched
      if (touched[fieldName]) {
        const error = validateField(fieldName, newValue);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      }
    },
    [touched, validateField]
  );

  // Handle blur event
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      const fieldName = name as keyof T;

      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [fieldName]: true,
      }));

      // Validate field
      const error = validateField(fieldName, values[fieldName]);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    },
    [validateField, values]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      
      // Mark all fields as touched
      const touchedFields: { [key in keyof T]?: boolean } = {};
      Object.keys(values).forEach((key) => {
        touchedFields[key as keyof T] = true;
      });
      setTouched(touchedFields);

      // Validate form
      const isValid = validateForm();
      if (!isValid) {
        onError?.(errors);
        return;
      }

      // Submit form
      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
        // Handle submission error
      } finally {
        setIsSubmitting(false);
      }
    },
    [errors, onError, onSubmit, validateForm, values]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Set field value manually
  const setFieldValue = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Validate field if it's been touched
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [touched, validateField]
  );

  // Set field touched state manually
  const setFieldTouched = useCallback(<K extends keyof T>(name: K, isTouched: boolean = true) => {
    setTouched((prev) => ({
      ...prev,
      [name]: isTouched,
    }));
  }, []);

  // Check if a field has an error
  const hasError = useCallback(
    (name: keyof T): boolean => {
      return Boolean(touched[name] && errors[name]);
    },
    [errors, touched]
  );

  // Get error message for a field
  const getError = useCallback(
    (name: keyof T): string | undefined => {
      return touched[name] ? errors[name] : undefined;
    },
    [errors, touched]
  );

  return {
    // Form state
    values,
    errors,
    touched,
    isSubmitting,
    
    // Form actions
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldTouched,
    setValues,
    
    // Validation helpers
    validateField,
    validateForm,
    hasError,
    getError,
    
    // Form status
    isValid: Object.keys(errors).length === 0,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialValues),
  };
}

// Common validation rules
export const required = (message = 'This field is required'): ValidationRule<any> => ({
  validator: (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  },
  message,
});

export const minLength = (min: number, message?: string): ValidationRule<string> => ({
  validator: (value) => value.length >= min,
  message: message || `Must be at least ${min} characters`,
});

export const maxLength = (max: number, message?: string): ValidationRule<string> => ({
  validator: (value) => value.length <= max,
  message: message || `Must be at most ${max} characters`,
});

export const email = (message = 'Please enter a valid email address'): ValidationRule<string> => ({
  validator: (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
  message,
});

export const pattern = (
  regex: RegExp,
  message: string
): ValidationRule<string> => ({
  validator: (value) => regex.test(value),
  message,
});

export const matchField = (
  fieldName: string,
  message: string
): ValidationRule<string> => ({
  validator: (value, values) => value === values[fieldName],
  message,
});
