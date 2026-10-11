import CryptoJS from 'crypto-js';

/**
 * api.js — every call the QuickInfo site makes to quickinfo-back-end.
 *
 * The back end encrypts each JSON response with AES-256-CBC, keyed by the
 * SHA-256 of a shared secret (src/middlewares/encryptResponse.js there). This
 * file reverses it. VITE_SECRET_KEY must equal SECRET_KEY on the server.
 */

const BASE = (import.meta.env.VITE_API_BASE || '/api').replace(/\/$/, '');
const PUBLIC = `${BASE}/quickinfo/platform/public`;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || '';

function decrypt(payload) {
  if (!payload || !payload.encrypted) return payload;
  const key = CryptoJS.SHA256(SECRET_KEY);
  const iv = CryptoJS.enc.Base64.parse(payload.iv);
  const plain = CryptoJS.AES.decrypt(payload.data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
  if (!plain) throw new Error('Could not read the server response.');
  return JSON.parse(plain);
}

/** An error whose message is safe to show to the visitor. */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function call(path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(`${PUBLIC}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });
  } catch {
    throw new ApiError('Unable to reach the server. Please check your connection and try again.', 0);
  }

  let data;
  try {
    data = decrypt(await res.json());
  } catch {
    throw new ApiError('Something went wrong. Please try again later.', res.status);
  }

  if (!res.ok || data.successstatus === false) {
    throw new ApiError(data.message || 'Something went wrong. Please try again later.', res.status);
  }
  return data.data;
}

export const getServices = () => call('/services');
export const getQueryTypes = () => call('/query-types');
export const getPrivacyPolicy = () => call('/privacy-policy');
export const getTermsAndConditions = () => call('/terms-and-conditions');
export const submitContactQuery = (form) => call('/contact-us', { method: 'POST', body: form });
