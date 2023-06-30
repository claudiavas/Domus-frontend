import React, { createContext } from 'react';

export const translations = {
  
  default: {
    type: {
      apartment: "Piso",
      penthouse: "Ático",
      duplex: "Duplex",
      house: "Casa",
      chalet: "Chalet",
      other: "Otro"
    }
  },

  en: {
    type: {
      apartment: "Apartment",
      penthouse: "Penthouse",
      duplex: "Duplex",
      house: "House",
      chalet: "Chalet",
      other: "Other"
    }
  }

};

export const TranslationContext = createContext(translations.default);

export const TranslationProvider = ({ children, lang }) => {
  const selectedTranslations = translations[lang] || translations.default;

  return (
    <TranslationContext.Provider value={selectedTranslations}>
      {children}
    </TranslationContext.Provider>
  );
};