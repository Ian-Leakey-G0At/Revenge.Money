"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { HeaderNav } from '@/components/navigation/header-nav';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn('flex flex-col', isMounted ? 'min-h-dvh' : 'min-h-screen')}>
      <Suspense fallback={null}>
        <HeaderNav />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
    </div>
  );
}
