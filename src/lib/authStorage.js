/**
 * authStorage.js — Camada de persistência de autenticação.
 *
 * Responsabilidades:
 *   - Armazenar/recuperar a sessão (token JWT + dados do usuário).
 *   - Validar a expiração do JWT antes de devolvê-lo (CWE-798 mitigation).
 *   - Isolar o acesso ao localStorage em um único módulo (DRY + facilita
 *     futura migração para httpOnly cookies quando o backend suportar).
 *
 * LIMITAÇÃO CONhecida e documentada (defensabilidade em entrevista):
 *   O token é salvo em `localStorage`, que é legível por qualquer script
 *   que execute no contexto da página. Isso é uma anti-pattern (OWASP:
 *   "Storing sensitive data in client-side storage"). A mitigação principal
 *   é a Content-Security-Policy (CSP) em index.html, que bloqueia scripts
 *   inline e terceiros, reduzindo drasticamente a superfície de um XSS.
 *   A correção definitiva exige backend cooperation (Set-Cookie com
 *   HttpOnly + SameSite=Strict), documentada no ADR-001.
 *
 * Never log the raw token or user PII from this module.
 */

const STORAGE_KEY = 'auth';

/** @typedef {{ token: string, user: { _id: string, fullname?: string, email?: string } }} AuthSession */

/**
 * Decodifica o payload de um JWT sem verificação de assinatura (a verificação
 * é feita pelo backend). Apenas lê `exp`/`iat` para validação local de vida útil.
 * @param {string} token
 * @returns {{ exp?: number, iat?: number, [k: string]: unknown } | null}
 */
function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1];
    // JWT payload é base64url; converte para base64 padrão e decodifica.
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Verifica se o token ainda é válido (não expirou).
 * @param {string | null | undefined} token
 * @returns {boolean}
 */
function isTokenValid(token) {
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') {
    // Sem info de expiração: assume inválido por segurança (fail-closed).
    return false;
  }
  // exp está em segundos desde a epoch; consideramos margem de 30s.
  return Date.now() / 1000 < payload.exp - 30;
}

/**
 * Recupera a sessão armazenada, validando o token.
 * @returns {AuthSession | null}
 */
function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session || typeof session !== 'object') return null;
    if (!isTokenValid(session.token)) {
      // Token expirado ou inválido: limpa o storage para evitar retries.
      clearSession();
      return null;
    }
    return /** @type {AuthSession} */ (session);
  } catch {
    // Corrupção de storage ou JSON inválido: fail-closed.
    return null;
  }
}

/**
 * Salva a sessão. Nunca faça log do token ou dos dados PII.
 * @param {AuthSession} session
 */
function setSession(session) {
  if (!session || !session.token) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Quota excedida / storage indisponível: a sessão simplesmente não é gravada.
  }
}

/** Remove a sessão (logout). */
function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage indisponível — opera sem falhar.
  }
}

export { getSession, setSession, clearSession, isTokenValid };