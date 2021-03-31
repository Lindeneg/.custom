import { useState, useCallback, useEffect, useRef } from 'react';

import { /* IResponse, */ UseHttp, UseHttpRequest } from '../util';

export function useHttp<T>(): UseHttp<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const activeRequests = useRef<AbortController[]>([]);

  const sendRequest: UseHttpRequest<T> = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const abortController: AbortController = new AbortController();
      activeRequests.current.push(abortController);
      try {
        const response: Response = await fetch(url, {
          method,
          body,
          headers,
          signal: abortController.signal
        });
        const data: T & any = await response.json();

        activeRequests.current = activeRequests.current.filter(
          e => e !== abortController
        );

        if (!response.ok) {
          throw new Error(data.message);
        }

        return data;
      } catch (err) {
        setError(err.message || 'An error occurred. Please try again.');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = (): void => {
    setError('');
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      activeRequests.current.forEach(controller => {
        controller.abort();
      });
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
}
