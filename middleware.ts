import createMiddleware from "next-intl/middleware";

import { defaultLocale, localePrefix, locales } from "@/lib/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ["/((?!_next|.*[.].*).*)"],
};
