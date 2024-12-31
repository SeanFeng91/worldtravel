export const ENDPOINTS = {
  GEMINI: 'https://generativelanguage.googleapis.com/v1alpha',
  YOUTUBE: 'https://www.googleapis.com/youtube/v3',
  MAPS: 'https://maps.googleapis.com/maps/api'
};

export const RATE_LIMIT = {
  maxRequests: 60,
  timeWindow: 60 * 1000  // 1分钟
};

export const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 5000
};

export const DEFAULT_AI_SETTINGS = {
  temperature: 0.3,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 8192
};