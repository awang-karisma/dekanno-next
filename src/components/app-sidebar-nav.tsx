"use client";

import type { ComponentType } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export function AppSidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {items.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground",
              isActive && "bg-primary/10 text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
