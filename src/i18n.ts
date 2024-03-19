import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageEN from "./locate/en/translate.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: languageEN,
    },
    lng: "en",
    fallbackLng: "en",
    debug: true,
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    }
  });

export default i18n;
