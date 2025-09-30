import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BookOpenCheck, LayoutDashboard, Users } from "lucide-react";

import { AppSidebarNav, type NavItem } from "@/components/app-sidebar-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { locales } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export default async function AppLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const tNav = await getTranslations({ namespace: "nav" });
  const tApp = await getTranslations({ namespace: "app" });

  const navItems: NavItem[] = [
    {
      href: `/${locale}/dashboard`,
      label: tNav("dashboard"),
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/attendance`,
      label: tNav("attendance"),
      icon: BookOpenCheck,
    },
    {
      href: `/${locale}/students`,
      label: tNav("students"),
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-64">
          <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <Link
                  href={`/${locale}/dashboard`}
                  className="text-lg font-semibold"
                >
                  {tApp("name")}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {tNav("dashboard")}
                </p>
              </div>
              <ThemeToggle />
            </div>
            <Separator />
            <div className="px-3 py-4">
              <AppSidebarNav items={navItems} />
            </div>
            <Separator />
            <div className="px-5 py-4">
              <LanguageSwitcher className="w-full" />
            </div>
          </div>
        </aside>
        <main
          className={cn("flex-1 space-y-6", "pb-10 lg:pb-16")}
          aria-live="polite"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
