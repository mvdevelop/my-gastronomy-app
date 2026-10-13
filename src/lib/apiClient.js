/**
 * apiClient.js — Camada de comunicação com a API externa.
 *
 * Responsabilidades:
 *   - Centralizar a URL base e os headers comuns.
 *   - Tratar erros HTTP de forma consistente (CWE-209 mitigation: não
 *     deixa stack traces ou mensagens internas vazar para o usuário).
 *   - Nunca logar bodies sensíveis (credenciais, PII).
 *
 * Observação de segurança:
 *   O header `Access-Control-Allow-Origin: '*'` que estava sendo setado no
 *   client é um mal-entendido — CORS é controlado pelo *servidor*, não pelo
 *   cliente. Removemos esse header here; o backend precisa configurar sua
 *   própria política de CORS (CWE-942).
 *
 * @typedef {{ success: boolean, body?: unknown, message?: string, [k: string]: unknown }} ApiResponse
 */

/** Base URL da API. Em produção, viria de variável de ambiente (ex: VITE_API_URL).
 *  Em dev, um proxy Vite (/api) evita problemas de CORS com o backend. */
const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  'https://my-gastronomy-backend.vercel.app';

/** Tempo máximo por requisição (ms) para evitar hangs (DoS mitigation). */
const REQUEST_TIMEOUT_MS = 10000;

/**
 * Executa uma requisição HTTP com timeout e tratamento de erro padronizado.
 * @param {string} endpoint — caminho relativo, ex: '/auth/login'.
 * @param {RequestInit} [init]
 * @returns {Promise<ApiResponse>}
 */
async function request(endpoint, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(init.headers || {}),
      },
      signal: controller.signal,
    });

    // Fail-fast em erros HTTP (4xx/5xx) — não tentamos parsear bodies de erro.
    if (!response.ok) {
      return {
        success: false,
        message: `Request failed with status ${response.status}`,
      };
    }

    const data = await response.json().catch(() => ({}));
    return /** @type {ApiResponse} */ (data);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { success: false, message: 'Request timed out' };
    }
    return { success: false, message: 'Network error' };
  } finally {
    clearTimeout(timer);
  }
}

/** @param {string} endpoint @param {unknown} body @returns {Promise<ApiResponse>} */
const post = (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) });
/** @param {string} endpoint @returns {Promise<ApiResponse>} */
const get = (endpoint) => request(endpoint, { method: 'GET' });

export { API_BASE, request, post, get };