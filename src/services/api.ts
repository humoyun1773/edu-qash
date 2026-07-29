export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://169.58.72.177';

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
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, headers, ...customOptions } = options;
  const token = getAuthToken();

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...customOptions,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.warn(`[API] Endpoint request failed for ${url}:`, error.message);
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, data?: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'POST', data }),
  put: <T>(endpoint: string, data?: any, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'PUT', data }),
  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};
