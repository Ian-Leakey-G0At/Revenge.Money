"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AppLayout } from "./app-layout";

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
    )
}
