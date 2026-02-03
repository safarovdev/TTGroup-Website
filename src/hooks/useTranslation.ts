"use client";
import { useLanguage } from '@/context/LanguageContext';
import { useCallback } from 'react';

/**
 * Gets a nested value from an object using a dot-notation path.
 * @param obj The object to query.
 * @param path The dot-notation path (e.g., 'parent.child.key').
 * @returns The found value, or undefined.
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const useTranslation = () => {
  const { translations } = useLanguage();

  /**
   * Translates a key into the current language.
   * @param key The dot-notation key for the translation string (e.g., 'header.title').
   * @returns The translated string, or the key itself if not found.
   */
  const t = useCallback((key: string): string => {
    const value = getNestedValue(translations, key);
    return value || key;
  }, [translations]);

  return { t };
};
