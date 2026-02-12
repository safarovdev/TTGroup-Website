'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useLanguage } from './LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

const API_KEY = '0f9b46cf4149daf21d134cc5';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
const CACHE_KEY = 'currencyRates';
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours

export type Currency = 'USD' | 'EUR' | 'RUB' | 'UZS';
const currencies: Currency[] = ['USD', 'EUR', 'RUB', 'UZS'];

interface ExchangeRates {
    [key: string]: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rates: ExchangeRates | null;
  loading: boolean;
  formatPrice: (price: number, options?: { currency?: Currency }) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const storedCurrency = localStorage.getItem('currency') as Currency | null;
    if (storedCurrency && currencies.includes(storedCurrency)) {
      setCurrency(storedCurrency);
    }

    const fetchRates = async () => {
      setLoading(true);
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { rates: cachedRates, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setRates(cachedRates);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch exchange rates');
        const data = await response.json();
        const relevantRates = {
            USD: data.conversion_rates.USD,
            EUR: data.conversion_rates.EUR,
            RUB: data.conversion_rates.RUB,
            UZS: data.conversion_rates.UZS,
        };
        setRates(relevantRates);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ rates: relevantRates, timestamp: Date.now() }));
      } catch (error) {
        console.error("Failed to fetch currency rates:", error);
        if (cachedData) {
             const { rates: cachedRates } = JSON.parse(cachedData);
             setRates(cachedRates);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  const formatPrice = useCallback((price: number, options?: { currency?: Currency }): string => {
        const targetCurrency = options?.currency || currency;
        if (loading || !rates || price === null || price === undefined) {
            return '...';
        }
        
        if (price === 0) {
             return t('priceFormats.negotiable');
        }

        const rate = rates[targetCurrency];
        if (!rate) return `${price} USD`;

        const convertedPrice = price * rate;
        
        let finalPrice;
        switch(targetCurrency) {
            case 'UZS':
                finalPrice = Math.round(convertedPrice / 1000) * 1000;
                break;
            case 'RUB':
                finalPrice = Math.round(convertedPrice / 10) * 10;
                break;
            default:
                finalPrice = Math.round(convertedPrice);
        }

        const formatted = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: targetCurrency,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format(finalPrice);

        return formatted;

    }, [currency, rates, loading, locale, t]);

  const value = {
    currency,
    setCurrency,
    rates,
    loading,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
