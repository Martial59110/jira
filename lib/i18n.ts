import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const namespaces = ["common"] as const;

export const resources = {
  en: {
    common: {
      heroTitle: "Pilotez vos projets en toute sérénité.",
      heroSubtitle:
        "Centralisez tâches, conversations et décisions produit dans une seule interface collaborative.",
      heroCtaPrimary: "Créer un tableau",
      heroCtaSecondary: "Explorer la démo",
      statsCompleted: "{{count}} tickets livrés",
      statsPending: "{{count}} tickets en cours",
      toggleLanguage: "Basculer en {{language}}",
    },
  },
  fr: {
    common: {
      heroTitle: "Pilotez vos projets en toute sérénité.",
      heroSubtitle:
        "Centralisez tâches, conversations et décisions produit dans une seule interface collaborative.",
      heroCtaPrimary: "Créer un tableau",
      heroCtaSecondary: "Explorer la démo",
      statsCompleted: "{{count}} tickets livrés",
      statsPending: "{{count}} tickets en cours",
      toggleLanguage: "Passer en {{language}}",
    },
  },
} as const;

const defaultLanguage = "fr";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    fallbackLng: defaultLanguage,
    lng: defaultLanguage,
    debug: false,
    resources,
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });
}

export type AppLanguage = keyof typeof resources;
export type AppNamespaces = (typeof namespaces)[number];

export default i18n;
