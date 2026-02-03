"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

// Using typeof ru assumes en.json has the same structure.
// For more robustness, you might define a strict type for your translations.
type Translations = typeof ru;

interface LanguageContextType {
  locale: 'ru' | 'en';
  setLocale: (locale: 'ru' | 'en') => void;
  translations: Translations;
}

const translationsData = { ru, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<'ru' | 'en'>('ru'); // Default language

  // Effect to load saved locale from localStorage on client-side mount
  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as 'ru' | 'en' | null;
    if (storedLocale && ['ru', 'en'].includes(storedLocale)) {
      setLocale(storedLocale);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save locale to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const value = {
    locale,
    setLocale,
    translations: translationsData[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
