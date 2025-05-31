import { useState, useCallback } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions<T> {
  url: string;
  method?: HttpMethod;
  body?: any;
  headers?: HeadersInit;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
}

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

/**
 * A custom hook for making API requests
 * @template T - The expected response data type
 * @returns An object containing the API state and request function
 */
export function useApi<T = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  /**
   * Makes an API request
   * @param options - The request options
   * @returns A promise that resolves with the response data
   */
  const request = useCallback(
    async ({
      url,
      method = 'GET',
      body,
      headers = {},
      onSuccess,
      onError,
      onFinally,
    }: ApiRequestOptions<T>): Promise<T | null> => {
      // Set loading state
      setState((prev) => ({
        ...prev,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      }));

      try {
        // Prepare request options
        const requestOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          credentials: 'same-origin',
        };

        // Add body for non-GET requests
        if (method !== 'GET' && body) {
          requestOptions.body = JSON.stringify(body);
        }

        // Make the request
        const response = await fetch(url, requestOptions);

        // Handle non-OK responses
        if (!response.ok) {
          const errorData = await parseResponse(response);
          throw new Error(
            errorData?.message || `HTTP error! status: ${response.status}`
          );
        }


        // Parse the response
        const data = await parseResponse(response);

        // Update state with successful response
        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(data);
        }

        return data;
      } catch (error) {
        // Handle errors
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        const apiError = new Error(errorMessage);

        // Update state with error
        setState((prev) => ({
          ...prev,
          error: apiError,
          isLoading: false,
          isSuccess: false,
          isError: true,
        }));

        // Call error callback if provided
        if (onError) {
          onError(apiError);
        }

        return null;
      } finally {
        // Call finally callback if provided
        if (onFinally) {
          onFinally();
        }
      }
    },
    []
  );

  // Helper function to parse the response
  const parseResponse = async (response: Response): Promise<any> => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  };

  // Reset the API state
  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    request,
    reset,
    
    // Aliases for convenience
    isIdle: !state.isLoading && !state.isSuccess && !state.isError,
  };
}

// Pre-configured API methods
export function useGet<T = any>() {
  const api = useApi<T>();
  
  const get = useCallback((url: string, options?: Omit<ApiRequestOptions<T>, 'url' | 'method'>) => {
    return api.request({
      ...options,
      url,
      method: 'GET',
    });
  }, [api]);
  
  return { ...api, get };
}

export function usePost<T = any>() {
  const api = useApi<T>();
  
  const post = useCallback((url: string, body: any, options?: Omit<ApiRequestOptions<T>, 'url' | 'method' | 'body'>) => {
    return api.request({
      ...options,
      url,
      method: 'POST',
      body,
    });
  }, [api]);
  
  return { ...api, post };
}

export function usePut<T = any>() {
  const api = useApi<T>();
  
  const put = useCallback((url: string, body: any, options?: Omit<ApiRequestOptions<T>, 'url' | 'method' | 'body'>) => {
    return api.request({
      ...options,
      url,
      method: 'PUT',
      body,
    });
  }, [api]);
  
  return { ...api, put };
}

export function usePatch<T = any>() {
  const api = useApi<T>();
  
  const patch = useCallback((url: string, body: any, options?: Omit<ApiRequestOptions<T>, 'url' | 'method' | 'body'>) => {
    return api.request({
      ...options,
      url,
      method: 'PATCH',
      body,
    });
  }, [api]);
  
  return { ...api, patch };
}

export function useDelete<T = any>() {
  const api = useApi<T>();
  
  const remove = useCallback((url: string, options?: Omit<ApiRequestOptions<T>, 'url' | 'method'>) => {
    return api.request({
      ...options,
      url,
      method: 'DELETE',
    });
  }, [api]);
  
  return { ...api, remove };
}
