"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const tTheme = useTranslations("theme");

  const isDark = theme === "dark";

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={isDark ? tTheme("light") : tTheme("dark")}
      title={tTheme("toggle")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{tTheme("toggle")}</span>
    </Button>
  );
}
