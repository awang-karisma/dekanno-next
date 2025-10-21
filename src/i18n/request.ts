import { getRequestConfig } from "next-intl/server";

import { defaultLocale, type Locale, locales } from "@/lib/i18n/config";

const dictionaries = {
  en: () => import("../../messages/en.json").then((module) => module.default),
  id: () => import("../../messages/id.json").then((module) => module.default),
} satisfies Record<Locale, () => Promise<Record<string, unknown>>>;

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  const messages = await dictionaries[resolvedLocale]();

  return {
    locale: resolvedLocale,
    messages,
  };
});
