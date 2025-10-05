"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AppLayout } from "./app-layout";
import { useEffect, useState } from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <AppLayout>{children}</AppLayout>;
    }

    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
    )
}
