import type { ApiResponse } from '../types/domain';

export const API_BASE = import.meta.env.VITE_API_URL || 'https://my-gastronomy-backend.vercel.app';
const REQUEST_TIMEOUT_MS = 10000;

function getAuthHeader(): Record<string, string> {
  try {
    const raw = localStorage.getItem('auth');
    const token = raw ? (JSON.parse(raw) as { token?: string }).token : undefined;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export async function request<T = unknown>(
  endpoint: string,
  init: RequestInit = {},
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...getAuthHeader(),
        ...init.headers,
      },
      signal: controller.signal,
    });
    if (!response.ok) return { success: false, message: `Request failed with status ${response.status}` };
    return (await response.json().catch(() => ({}))) as ApiResponse<T>;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { success: false, message: 'Request timed out' };
    }
    return { success: false, message: 'Network error' };
  } finally {
    window.clearTimeout(timer);
  }
}

export const post = <T = unknown>(endpoint: string, body: unknown) =>
  request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });

export const get = <T = unknown>(endpoint: string) => request<T>(endpoint, { method: 'GET' });
