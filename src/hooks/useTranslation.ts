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
   * Translates a key into the current language, with optional substitutions.
   * @param key The dot-notation key for the translation string (e.g., 'header.title').
   * @param substitutions An object of values to replace placeholders (e.g., { count: 5 }).
   * @returns The translated and formatted string, or the key itself if not found.
   */
  const t = useCallback((key: string, substitutions?: Record<string, string | number>): string => {
    let value = getNestedValue(translations, key);
    if (typeof value !== 'string') {
      return key; // Return the key if translation is not found or not a string
    }

    if (substitutions) {
      Object.entries(substitutions).forEach(([subKey, subValue]) => {
        const regex = new RegExp(`{{${subKey}}}`, 'g');
        value = value.replace(regex, String(subValue));
      });
    }

    return value;
  }, [translations]);

  return { t };
};
