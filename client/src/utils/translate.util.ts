import i18next from '@/i18n';

export function translate(key: string | string[], options?: Record<string, string>): string {
  return i18next.t(key, options);
}
