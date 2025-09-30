import type { NextIntlRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  id: () => import("@/messages/id.json").then((module) => module.default),
} satisfies Record<string, () => Promise<Record<string, unknown>>>;

export default {
  locales,
  defaultLocale,
  async messages({ locale }) {
    const loadDictionary = dictionaries[locale as keyof typeof dictionaries];

    if (!loadDictionary) {
      return dictionaries[defaultLocale]();
    }

    return loadDictionary();
  },
} satisfies NextIntlRequestConfig;
