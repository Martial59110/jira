import { en } from "./en";
import { fr } from "./fr";

export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export { en, fr };
