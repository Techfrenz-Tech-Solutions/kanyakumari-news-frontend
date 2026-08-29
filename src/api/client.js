import axios from 'axios'

const configuredBase = import.meta.env?.VITE_API_BASE_URL?.trim()

export const API_BASE_URL = configuredBase
  ? `${configuredBase.replace(/\/$/, '').replace(/\/api$/, '')}/api`
  : '/api'

export class PublicApiError extends Error {
  constructor({ status = 0, code = 'NETWORK_ERROR', message = 'Unable to reach the news service.', details = null } = {}) {
    super(message)
    this.name = 'PublicApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export function normalizeApiError(error) {
  if (error instanceof PublicApiError) return error
  if (axios.isCancel(error) || error?.code === 'ERR_CANCELED') {
    return new PublicApiError({ code: 'REQUEST_CANCELLED', message: 'Request cancelled.' })
  }
  if (error?.code === 'ECONNABORTED') {
    return new PublicApiError({ code: 'REQUEST_TIMEOUT', message: 'The news service took too long to respond.' })
  }
  const status = error?.response?.status || 0
  const payload = error?.response?.data?.error || {}
  const defaults = {
    400: 'The request was not valid.',
    404: 'The requested content was not found.',
    429: 'Too many requests. Please try again shortly.',
    500: 'The news service is temporarily unavailable.',
  }
  return new PublicApiError({
    status,
    code: payload.code || (status ? `HTTP_${status}` : 'NETWORK_ERROR'),
    message: payload.message || defaults[status] || 'Unable to reach the news service.',
    details: payload.details ?? null,
  })
}

export function createApiClient({ baseURL = API_BASE_URL, adapter } = {}) {
  const http = axios.create({ baseURL, timeout: 10_000, adapter })
  async function request(config) {
    try {
      const response = await http.request(config)
      const envelope = response.data
      if (!envelope || envelope.success !== true || !Object.prototype.hasOwnProperty.call(envelope, 'data')) {
        throw new PublicApiError({ status: response.status, code: 'INVALID_RESPONSE', message: 'The news service returned an invalid response.', details: envelope ?? null })
      }
      return envelope.data
    } catch (error) {
      throw normalizeApiError(error)
    }
  }
  return {
    request,
    get: (url, config = {}) => request({ ...config, method: 'GET', url }),
    post: (url, data, config = {}) => request({ ...config, method: 'POST', url, data }),
  }
}

export const apiClient = createApiClient()
