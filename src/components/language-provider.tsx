'use client';

import React, { createContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { translations, TranslationKey } from '@/lib/translations';

export type Language = 'en' | 'es';
export const supportedLanguages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, substitutions?: Record<string, string>) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: TranslationKey) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = useCallback((key: TranslationKey, substitutions?: Record<string, string>): string => {
    let text = translations[language][key] || translations.en[key];
    
    if (!text) {
        text = key; // Fallback to key if no translation found
    }

    if (substitutions) {
        Object.entries(substitutions).forEach(([subKey, subValue]) => {
            text = text.replace(`{{${subKey}}}`, subValue);
        });
    }
    return text;
  }, [language]);
  
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
