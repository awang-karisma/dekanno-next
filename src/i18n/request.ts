import { getRequestConfig } from "next-intl/server";

import { defaultLocale, locales } from "@/lib/i18n/config";

const dictionaries = {
  en: () => import("../../messages/en.json").then((module) => module.default),
  id: () => import("../../messages/id.json").then((module) => module.default),
} satisfies Record<string, () => Promise<Record<string, unknown>>>;

export default getRequestConfig(async ({ locale }) => {
  const loadDictionary = dictionaries[locale as keyof typeof dictionaries];

  const messages = loadDictionary
    ? await loadDictionary()
    : await dictionaries[defaultLocale]();

  return {
    locales,
    defaultLocale,
    locale,
    messages,
  };
});
