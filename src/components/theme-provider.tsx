"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme={props.defaultTheme ?? "system"}
      enableSystem={props.enableSystem ?? true}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
