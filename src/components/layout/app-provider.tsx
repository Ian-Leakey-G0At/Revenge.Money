/**
 * @file This file contains the root provider for the application, which is responsible
 * for dynamically selecting the appropriate layout (authentication or main app)
 * based on the current route. It also wraps the application in the `ThemeProvider`
 * to enable light and dark mode.
 */

"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from 'next/navigation';
import { AuthLayout } from "./auth-layout";
import { AppLayout } from "./app-layout";

/**
 * An array of routes that should use the authentication layout.
 */
const authRoutes = ["/login", "/signup"];

/**
 * The root provider for the application.
 *
 * This component uses the `usePathname` hook to determine the current route and
 * conditionally renders either the `AuthLayout` or the `AppLayout`.
 * It also sets up the `ThemeProvider` to manage the application's theme.
 *
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The rendered layout with the appropriate theme.
 */
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
