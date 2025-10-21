"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/lib/i18n/config";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <label
      className={`flex items-center gap-2 text-sm font-medium ${className ?? ""}`}
    >
      <span className="text-muted-foreground">{t("label")}</span>
      <select
        className="h-9 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const nextLocale = event.target.value;
          startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
          });
        }}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {code === "en" ? t("english") : t("indonesian")}
          </option>
        ))}
      </select>
    </label>
  );
}
