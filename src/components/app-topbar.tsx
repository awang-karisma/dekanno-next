"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { key: "profile", href: "/profile" },
  { key: "settings", href: "/settings" },
] as const;

export function AppTopbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tApp = useTranslations("app");
  const tTopbar = useTranslations("topbar");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {tTopbar("greeting")}
        </p>
        <h2 className="text-lg font-semibold text-foreground lg:text-xl">
          {tApp("name")}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary",
              "text-sm font-semibold text-secondary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            <span aria-hidden className="uppercase">
              JD
            </span>
            <span className="sr-only">{tTopbar("openMenu")}</span>
          </button>

          {isOpen ? (
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
                {menuItems.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    role="menuitem"
                    className="block rounded-md px-3 py-2 text-foreground transition hover:bg-muted"
                    onClick={() => setIsOpen(false)}
                  >
                    {tTopbar(`menu.${key}`)}
                  </Link>
                ))}
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-destructive transition hover:bg-destructive/10"
                  onClick={() => setIsOpen(false)}
                >
                  {tTopbar("menu.logout")}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
