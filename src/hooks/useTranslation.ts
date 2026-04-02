// Meridian Growth Advisory - Unified Translation Hook
// Resolves: languageTranslationOverrides[lang][key] → translations[lang][key]

import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';

export function useTranslation() {
  const { currentLanguage, languageTranslationOverrides } = useApp();
  const t = translations[currentLanguage] || translations.en;

  /**
   * Get translated text for a given key.
   * Checks admin overrides first, then falls back to base translations.
   */
  const gt = (key: string): string => {
    const override = languageTranslationOverrides[currentLanguage]?.[key];
    if (override) return override;
    return getTranslation(t, key);
  };

  return { gt, currentLanguage, rawT: t };
}
