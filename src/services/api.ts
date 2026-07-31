export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';


export const getAuthToken = (): string | null => {
  return localStorage.getItem('eduqash_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('eduqash_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('eduqash_token');
};

interface RequestOptions extends RequestInit {
  data?: any;
  ttl?: number; // Time-to-live in ms for caching GET requests
}

// Deduplication map for pending in-flight requests
const pendingRequests = new Map<string, Promise<any>>();

// In-memory cache for GET requests: url -> { timestamp, data }
const apiCache = new Map<string, { timestamp: number; data: any }>();

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, headers, ttl = 60000, ...customOptions } = options;
  const token = getAuthToken();

  const method = customOptions.method || (data ? 'POST' : 'GET');

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...customOptions,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const cleanBase = API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : '';
  const cleanEndpoint = endpoint.replace(/^\//, '');
  const url = cleanBase ? `${cleanBase}/${cleanEndpoint}` : `/${cleanEndpoint}`;

  // Invalidate matching GET cache on mutations
  if (method !== 'GET') {
    const pathBase = url.split('?')[0];
    for (const key of apiCache.keys()) {
      if (key.startsWith(pathBase)) {
        apiCache.delete(key);
      }
    }
  }

  // Check in-memory cache for GET requests
  if (method === 'GET' && ttl > 0) {
    const cached = apiCache.get(url);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data as T;
    }
  }

  // Deduplicate in-flight GET requests to the exact same URL
  if (method === 'GET' && pendingRequests.has(url)) {
    return pendingRequests.get(url) as Promise<T>;
  }

  const requestPromise = (async () => {
    try {
      let response = await fetch(url, config);

      // Handle HTTP 304 Not Modified cleanly
      if (response.status === 304) {
        const cached = apiCache.get(url);
        if (cached) {
          return cached.data as T;
        }
        // If 304 returned without memory cache, re-fetch with cache reload to get full JSON payload
        response = await fetch(url, { ...config, cache: 'reload' });
      }

      if (!response.ok && response.status !== 304) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        let errorMessage = errorData.message || errorData.detail;
        if (!errorMessage && errorData.non_field_errors) {
          errorMessage = Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors.join(', ') : String(errorData.non_field_errors);
        }
        if (!errorMessage && typeof errorData === 'object') {
          const firstKey = Object.keys(errorData)[0];
          if (firstKey) {
            const val = errorData[firstKey];
            errorMessage = `${firstKey}: ${Array.isArray(val) ? val.join(', ') : String(val)}`;
          }
        }
        throw new Error(errorMessage || `API Error: ${response.status}`);
      }

      const result = await response.json();

      // Store successful GET result in cache
      if (method === 'GET' && ttl > 0) {
        apiCache.set(url, { timestamp: Date.now(), data: result });
      }

      return result as T;
    } catch (error: any) {
      console.warn(`[API] Endpoint request failed for ${url}:`, error.message);
      throw error;
    } finally {
      if (method === 'GET') {
        pendingRequests.delete(url);
      }
    }
  })();

  if (method === 'GET') {
    pendingRequests.set(url, requestPromise);
  }

  return requestPromise;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, data?: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'POST', data }),
  put: <T>(endpoint: string, data?: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'PUT', data }),
  patch: <T>(endpoint: string, data?: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'PATCH', data }),
  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};
