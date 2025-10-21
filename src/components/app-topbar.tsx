"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import type { NavItem } from "@/components/app-sidebar-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const userMenuItems = [
  { key: "profile", href: "/profile" },
  { key: "settings", href: "/settings" },
] as const;

interface AppTopbarProps {
  items: NavItem[];
}

export function AppTopbar({ items }: AppTopbarProps) {
  const tApp = useTranslations("app");
  const tTopbar = useTranslations("topbar");

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navMenuRef = useRef<HTMLDivElement>(null);
  const navButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isNavOpen &&
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node) &&
        !navButtonRef.current?.contains(event.target as Node)
      ) {
        setIsNavOpen(false);
      }

      if (
        isUserMenuOpen &&
        userMenuWrapperRef.current &&
        !userMenuWrapperRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsNavOpen(false);
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isNavOpen, isUserMenuOpen]);

  return (
    <header className="relative rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <button
            ref={navButtonRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={isNavOpen}
            aria-controls="app-topbar-navigation"
            onClick={() => {
              setIsNavOpen((previous) => !previous);
              setIsUserMenuOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            {isNavOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
            <span className="sr-only">
              {isNavOpen
                ? tTopbar("closeNavigation")
                : tTopbar("openNavigation")}
            </span>
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {tTopbar("greeting")}
            </p>
            <h2 className="text-lg font-semibold text-foreground lg:text-xl">
              {tApp("name")}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4" ref={userMenuWrapperRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen((previous) => !previous);
                setIsNavOpen(false);
              }}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary",
                "text-sm font-semibold text-secondary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-haspopup="menu"
              aria-expanded={isUserMenuOpen}
            >
              <span aria-hidden className="uppercase">
                JD
              </span>
              <span className="sr-only">{tTopbar("openMenu")}</span>
            </button>

            {isUserMenuOpen ? (
              <div
                role="menu"
                aria-label={tTopbar("menu.title")}
                className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-border bg-popover p-2 text-sm shadow-lg"
              >
                <div className="px-3 pb-2 pt-1">
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    {tTopbar("menu.title")}
                  </p>
                </div>
                <div className="space-y-1">
                  {userMenuItems.map(({ key, href }) => (
                    <Link
                      key={key}
                      href={href}
                      role="menuitem"
                      className="block rounded-md px-3 py-2 text-foreground transition hover:bg-muted"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {tTopbar(`menu.${key}`)}
                    </Link>
                  ))}
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-destructive transition hover:bg-destructive/10"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {tTopbar("menu.logout")}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isNavOpen ? (
        <div
          id="app-topbar-navigation"
          ref={navMenuRef}
          className="absolute left-0 right-0 top-full z-20 mt-3 rounded-xl border border-border bg-popover p-3 shadow-lg lg:hidden"
        >
          <div className="px-1 pb-2">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              {tTopbar("navigation")}
            </p>
          </div>
          <nav className="space-y-1">
            {items.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                onClick={() => setIsNavOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LanguageSwitcher className="flex-1 justify-between" />
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </header>
  );
}
