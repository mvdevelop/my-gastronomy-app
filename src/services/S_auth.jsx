import { useState } from "react";

// Centralized HTTP client: handles timeouts, HTTP errors, and never leaks
// stack traces (CWE-209 mitigation).
import { post } from "../lib/apiClient";

// Centralized auth storage: validates JWT expiry and isolates localStorage
// (CWE-798 / CWE-754 mitigation).
import { setSession, clearSession, getSession } from "../lib/authStorage";

/**
 * S_auth — hook de autenticação (login/signup/logout).
 *
 * CORREÇÕES DE SEGURANÇA:
 *   - A URL base e os headers são centralizados em apiClient.js; o header
 *     `Access-Control-Allow-Origin: '*'` que estava sendo setado no client
 *     foi REMOVIDO — CORS é responsabilidade do *servidor*, não do cliente
 *     (CWE-942). O backend deve configurar sua própria política.
 *   - O token é salvo via setSession(), que fail-safe em caso de erro.
 *   - Nenhum log do token ou PII do usuário é feito aqui.
 */
function S_auth() {
  const [authLoading, setAuthLoading] = useState(false);

  const login = async (formData) => {
    setAuthLoading(true);
    try {
      const result = await post('/auth/login', formData);
      if (result.success && result.body?.token) {
        setSession({ token: result.body.token, user: result.body.user });
        return { success: true };
      }
      return { success: false, message: 'Invalid credentials.' };
    } catch {
      return { success: false, message: 'Unable to sign in.' };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  const signup = async (formData) => {
    setAuthLoading(true);
    try {
      const result = await post('/auth/signup', formData);
      if (result.success && result.body?.token) {
        setSession({ token: result.body.token, user: result.body.user });
        return { success: true };
      }
      return { success: false, message: 'Unable to create account.' };
    } catch {
      return { success: false, message: 'Unable to create account.' };
    } finally {
      setAuthLoading(false);
    }
  };

  return { signup, login, logout, authLoading, getSession };
}

export default S_auth;