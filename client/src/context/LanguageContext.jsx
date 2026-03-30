import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: { name: 'English', flag: '🇬🇧', code: 'en' },
  ru: { name: 'Русский', flag: '🇷🇺', code: 'ru' },
  am: { name: 'Հայերեն', flag: '🇦🇲', code: 'am' }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved && languages[saved] ? saved : 'en';
  });
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const module = await import(`../locales/${language}.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        const fallback = await import('../locales/en.json');
        setTranslations(fallback.default);
      }
    };
    loadTranslations();
  }, [language]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    if (typeof value === 'string') {
      return value.replace(/{(\w+)}/g, (match, param) => {
        return params[param] !== undefined ? params[param] : match;
      });
    }
    
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};