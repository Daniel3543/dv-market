import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, languages } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const currentLang = languages[language];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/10 transition-all duration-300"
      >
        <FiGlobe className="text-lg" />
        <span className="text-sm hidden sm:inline">{currentLang.name}</span>
        <span className="text-lg">{currentLang.flag}</span>
        <FiChevronDown className={`text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-40 glass-card rounded-xl overflow-hidden z-50"
          >
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-white/10 transition-colors ${
                  language === code ? 'text-primary-400 bg-white/5' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {language === code && (
                  <motion.div
                    layoutId="activeLanguage"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;