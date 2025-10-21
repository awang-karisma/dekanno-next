import * as React from "react";

import { cn } from "@/lib/utils";

type SeparatorOrientation = "horizontal" | "vertical";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    const ariaProps = decorative
      ? {}
      : ({ "aria-orientation": orientation } satisfies Pick<
          React.AriaAttributes,
          "aria-orientation"
        >);

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className,
        )}
        {...ariaProps}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";

export { Separator };
