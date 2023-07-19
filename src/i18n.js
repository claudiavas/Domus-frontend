import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Eses from "./locales/Es-es.json";
import Enus from "./locales/En-us.json";
import Es419 from "./locales/Es-419.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: Enus,
      es: Eses,
      "es-419": Es419
    },
    fallbackLng: "es",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

  i18n.changeLanguage("es");

export default i18n;
