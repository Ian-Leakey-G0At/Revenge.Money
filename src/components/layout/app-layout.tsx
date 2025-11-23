"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn('flex flex-col', isMounted ? 'min-h-dvh' : 'min-h-screen')}>
      <main className="flex-1">{children}</main>
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
    </div>
  );
}
