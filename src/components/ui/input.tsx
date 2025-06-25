import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(`block w-full rounded-md bg-[var(--inputBg)] px-2 py-2 md:px-3 md:py-2.5 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 text-xs md:text-sm focus:outline-[var(--mainColor)]`,className)}

      {...props}
    />
  )
}

export { Input }
