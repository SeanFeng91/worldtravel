import { DEFAULT_AI_SETTINGS } from '../config/index.js';

export function validateSettings(settings = {}) {
  return {
    temperature: Math.max(0, Math.min(1, settings?.temperature ?? DEFAULT_AI_SETTINGS.temperature)),
    topK: Math.max(1, Math.min(40, settings?.topK ?? DEFAULT_AI_SETTINGS.topK)),
    topP: Math.max(0, Math.min(1, settings?.topP ?? DEFAULT_AI_SETTINGS.topP)),
    maxOutputTokens: Math.max(1000, Math.min(8192, settings?.maxOutputTokens ?? DEFAULT_AI_SETTINGS.maxOutputTokens))
  };
} 