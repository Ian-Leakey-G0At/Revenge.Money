"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from 'next/navigation';
import { AuthLayout } from "./auth-layout";
import { AppLayout } from "./app-layout";

const authRoutes = ["/login", "/signup"];

export function AppProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthRoute = authRoutes.includes(pathname);

    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {isAuthRoute ? (
            <AuthLayout>{children}</AuthLayout>
          ) : (
            <AppLayout>{children}</AppLayout>
          )}
        </ThemeProvider>
    )
}
