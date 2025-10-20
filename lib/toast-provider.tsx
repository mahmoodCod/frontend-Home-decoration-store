"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      dir="rtl"
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans)",
        },
        className: "text-right",
      }}
      richColors
    />
  )
}
