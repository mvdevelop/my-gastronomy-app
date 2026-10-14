import { useState } from 'react';
import { post } from '../lib/apiClient';
import { clearSession, getSession, setSession } from '../lib/authStorage';
import type { AuthSession } from '../types/domain';

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthService {
  signup: (formData: Record<string, string>) => Promise<AuthResult>;
  login: (formData: Record<string, string>) => Promise<AuthResult>;
  logout: () => void;
  authLoading: boolean;
  getSession: typeof getSession;
}

function saveAuthSession(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const candidate = body as Partial<AuthSession>;
  if (!candidate.token || !candidate.user?._id) return false;
  setSession({ token: candidate.token, user: candidate.user });
  return true;
}

function S_auth(): AuthService {
  const [authLoading, setAuthLoading] = useState(false);

  const login = async (formData: Record<string, string>): Promise<AuthResult> => {
    setAuthLoading(true);
    try {
      const result = await post('/auth/login', formData);
      return saveAuthSession(result.body)
        ? { success: true }
        : { success: false, message: 'Invalid credentials.' };
    } catch {
      return { success: false, message: 'Unable to sign in.' };
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (formData: Record<string, string>): Promise<AuthResult> => {
    setAuthLoading(true);
    try {
      const result = await post('/auth/signup', formData);
      return saveAuthSession(result.body)
        ? { success: true }
        : { success: false, message: 'Unable to create account.' };
    } catch {
      return { success: false, message: 'Unable to create account.' };
    } finally {
      setAuthLoading(false);
    }
  };

  return { signup, login, logout: clearSession, authLoading, getSession };
}

export default S_auth;
