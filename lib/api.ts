/**
 * API Client
 * A reusable HTTP client for making API requests with built-in error handling and authentication
 */

import { ApiResponse, QueryParams } from '@/types/common';

// Default API configuration
const DEFAULT_CONFIG: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  credentials: 'same-origin',
};

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * API Client class for making HTTP requests
 */
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private authToken: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultHeaders = { ...DEFAULT_CONFIG.headers };
  }

  /**
   * Set the authentication token for subsequent requests
   */
  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  /**
   * Make a GET request
   */
  async get<T = any>(
    endpoint: string,
    params?: QueryParams,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, params, options);
  }

  /**
   * Make a POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, undefined, options);
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, undefined, options);
  }

  /**
   * Make a PATCH request
   */
  async patch<T = any>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, undefined, options);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, data, undefined, options);
  }

  /**
   * Make a request with a file upload
   */
  async upload<T = any>(
    endpoint: string,
    file: File,
    fieldName: string = 'file',
    data: Record<string, any> = {},
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    // Append additional data to formData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    return this.request<T>('POST', endpoint, formData, undefined, {
      ...options,
      headers: {
        // Let the browser set the Content-Type with the correct boundary
        ...(options.headers || {}),
      },
    });
  }

  /**
   * Internal method to make HTTP requests
   */
  private async request<T = any>(
    method: string,
    endpoint: string,
    data?: any,
    params?: QueryParams,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Build the URL with query parameters
    const url = this.buildUrl(endpoint, params);

    // Prepare request headers
    const headers = new Headers({
      ...this.defaultHeaders,
      ...(options.headers || {}),
    });

    // Add authorization header if token exists
    if (this.authToken) {
      headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    // Prepare request config
    const config: RequestInit = {
      ...DEFAULT_CONFIG,
      ...options,
      method,
      headers,
    };

    // Add request body for non-GET requests
    if (method !== 'GET' && data !== undefined) {
      if (data instanceof FormData) {
        // Remove Content-Type header to let the browser set it with the correct boundary
        headers.delete('Content-Type');
        config.body = data;
      } else if (typeof data === 'object') {
        config.body = JSON.stringify(data);
      } else {
        config.body = data;
      }
    }

    try {
      const response = await fetch(url, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Build the full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: QueryParams): string {
    // Ensure endpoint starts with a slash
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = `${this.baseUrl}${path}`;

    // Add query parameters if provided
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => queryString.append(`${key}[]`, String(item)));
          } else {
            queryString.append(key, String(value));
          }
        }
      });

      url += `?${queryString.toString()}`;
    }

    return url;
  }

  /**
   * Handle the API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    // Handle empty responses (e.g., 204 No Content)
    if (response.status === 204) {
      return { success: true, statusCode: 204 };
    }

    // Parse the response body
    let data;
    const contentType = response.headers.get('content-type');
    
    try {
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
    } catch (error) {
      // If we can't parse the response, return a generic error
      return {
        success: false,
        statusCode: response.status,
        error: 'Failed to parse response',
      };
    }

    // Handle error responses
    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        error: data.message || response.statusText,
        errors: data.errors,
        data: data,
      };
    }

    // Return successful response
    return {
      success: true,
      statusCode: response.status,
      data: data.data || data,
      message: data.message,
    };
  }

  /**
   * Handle request errors
   */
  private handleError(error: any): ApiResponse<any> {
    console.error('API request failed:', error);
    
    return {
      success: false,
      statusCode: 0,
      error: error.message || 'Network error',
    };
  }
}

// Create a singleton instance of the API client
const apiClient = new ApiClient();

export default apiClient;
