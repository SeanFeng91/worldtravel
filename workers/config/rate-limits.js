export const RATE_LIMIT = {
  maxRequests: 60,
  timeWindow: 60 * 1000
};

export const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 5000
}; 