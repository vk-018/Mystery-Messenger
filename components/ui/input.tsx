import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      readOnly
      data-slot="input"
      className={cn(
        // ORIGINAL shadcn styles (background intact)
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "dark:bg-input/30 md:text-sm",

        // FORCE focused look (permanent)
        "border-ring ring-2 ring-ring/50",

        // interaction (copy friendly)
        "cursor-text select-all opacity-100",

        className
      )}
      {...props}
    />
  )
}


export { Input }
