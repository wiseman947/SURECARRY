const API_BASE_URL = 'http://localhost:5000/api';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  let token = null;
  
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'API Request Failed');
  }

  return response.json();
};

// Utilities for Auth Storage
export const setToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
};

export const logout = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
  window.location.href = '/signin';
};
