import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em]",
  {
    variants: {
      variant: {
        default: "border-black/10 bg-ink-700/40 text-carbon-900",
        outline: "border-black/10 text-carbon-900",
        soft: "border-black/10 bg-ink-800/70 text-carbon-900"
      }
    },
    defaultVariants: {
      variant: "soft"
    }
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
