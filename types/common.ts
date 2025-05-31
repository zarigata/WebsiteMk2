/**
 * Common TypeScript type definitions for the application
 * These types are used throughout the application to ensure type safety.
 */

// Generic object type
export type AnyObject = Record<string, any>;

// Generic function type
export type AnyFunction = (...args: any[]) => any;

// Nullable type
export type Nullable<T> = T | null | undefined;

// Make specific properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific properties required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

// Make specific properties non-nullable
export type NonNullableField<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: NonNullable<T[P]>;
};

// Make all properties optional and nullable
export type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null;
};

// Make all properties required and non-nullable
export type RequiredNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

// Type for React component props with children
export type PropsWithChildren<P = unknown> = P & {
  children?: React.ReactNode;
};

// Type for React component with className prop
export type WithClassName<T = unknown> = T & {
  className?: string;
};

// Type for React component with style prop
export type WithStyle<T = unknown> = T & {
  style?: React.CSSProperties;
};

// Type for React component with ref
export type WithRef<T, P = HTMLElement> = T & {
  ref?: React.Ref<P>;
};

// Type for API response
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// Type for paginated API response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Type for sorting order
export type SortOrder = 'asc' | 'desc';

// Type for query parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
  [key: string]: any;
}

// Type for form field validation
export type ValidationRule<T = any> = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: T) => boolean | string;
  [key: string]: any;
};

// Type for form validation schema
export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]> | ValidationRule<T[K]>[];
};

// Type for form errors
export type FormErrors<T> = {
  [K in keyof T]?: string;
};

// Type for form touched fields
export type FormTouched<T> = {
  [K in keyof T]?: boolean;
};

// Type for form submission handler
export type FormSubmitHandler<T> = (
  values: T,
  formikHelpers: any
) => void | Promise<any>;
