"use client";
import React, { useState, useEffect } from 'react';
import { HeaderNav } from '@/components/navigation/header-nav';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { cn } from '@/lib/utils';

/**
 * Provides the primary layout structure for the application.
 *
 * This component renders the main header, the primary content area, and the
 * bottom navigation bar for mobile. It is a Client Component because it uses
 * state and effects to handle potential SSR hydration mismatches related to
 * viewport height units (`dvh` vs. `vh`).
 *
 * On the server, `100dvh` is not available and would fallback to `100vh`.
 * This component initially renders with `min-h-screen` (`100vh`) and then, once
 * mounted on the client, switches to `min-h-dvh` to ensure the layout
 * perfectly fits the dynamic mobile viewport, avoiding issues with browser UI.
 *
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The rendered application layout.
 */
export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn('flex flex-col', isMounted ? 'min-h-dvh' : 'min-h-screen')}>
      <HeaderNav />
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
