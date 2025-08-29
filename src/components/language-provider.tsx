'use client';

import React, { createContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { translations, TranslationKey } from '@/lib/translations';
import { translateText } from '@/ai/flows/translate';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt';
export const supportedLanguages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
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
  const [language, setLanguage] = useState<Language>('en');
  const [translationCache, setTranslationCache] = useState<Record<string, Record<string, string>>>({});
  const [isTranslating, setIsTranslating] = useState<Record<string, boolean>>({});

  const translateAndCache = useCallback(async (key: TranslationKey, targetLanguage: Language) => {
    const sourceText = translations.en[key];
    if (!sourceText) {
        return;
    }

    const cacheKey = `${targetLanguage}-${key}`;
    if (translationCache[targetLanguage]?.[key] || isTranslating[cacheKey]) {
        return;
    }

    setIsTranslating(prev => ({...prev, [cacheKey]: true}));
    try {
        const result = await translateText({ text: sourceText, targetLanguage });
        setTranslationCache(prev => ({
            ...prev,
            [targetLanguage]: {
                ...prev[targetLanguage],
                [key]: result.translatedText,
            }
        }));
    } catch (error) {
        console.error("Translation failed:", error);
        // Fallback to English
         setTranslationCache(prev => ({
            ...prev,
            [targetLanguage]: {
                ...prev[targetLanguage],
                [key]: sourceText,
            }
        }));
    } finally {
        setIsTranslating(prev => ({...prev, [cacheKey]: false}));
    }
  }, [translationCache, isTranslating]);

  const t = useCallback((key: TranslationKey, substitutions?: Record<string, string>): string => {
    let text: string | undefined;

    if (language === 'en') {
        text = translations.en[key];
    } else {
        text = translationCache[language]?.[key];
        if (!text) {
            translateAndCache(key, language);
            return '...';
        }
    }
    
    if (!text) {
        text = key; // Fallback to key if no translation found
    }

    if (substitutions) {
        Object.entries(substitutions).forEach(([subKey, subValue]) => {
            text = (text as string).replace(`{{${subKey}}}`, subValue);
        });
    }
    return text;
  }, [language, translationCache, translateAndCache]);
  
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
