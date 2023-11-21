import { Subscription } from "@/types/subscription";
import { create } from "zustand";

export type LanguageSupported =
  | "en"
  | "de"
  | "fr"
  | "es"
  | "bn"
  | "hi"
  | "ja"
  | "la"
  | "ru"
  | "zh"
  | "ar";

export const LanguageSupportedMap: Record<LanguageSupported, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  bn: "bangla",
  hi: "Hindi",
  ja: "Japanese",
  la: "Latin",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
};

const LANGUAGES_IN_FREE = 2;

interface LanguageState {
  language: LanguageSupported;
  setLanguage: (language: LanguageSupported) => void;
  getLanguages: (isPro: boolean) => LanguageSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguageSupported[];
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "en",
  setLanguage: (language: LanguageSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro) {
      return Object.keys(LanguageSupportedMap) as LanguageSupported[];
    }
    return Object.keys(LanguageSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE
    ) as LanguageSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguageSupportedMap).slice(
      LANGUAGES_IN_FREE
    ) as LanguageSupported[];
  },
}));

interface SubsciptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubsciptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
