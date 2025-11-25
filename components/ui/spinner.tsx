import { LoaderIcon } from "lucide-react";

import { cn } from "@/src/lib/utils";

export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      {...props}
    />
  );
}
