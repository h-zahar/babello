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

interface SubsciptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubsciptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
