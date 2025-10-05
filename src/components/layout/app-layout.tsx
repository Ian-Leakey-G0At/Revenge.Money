"use client";
import React from 'react';
import { HeaderNav } from '@/components/navigation/header-nav';
import { BottomNav } from '@/components/navigation/bottom-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderNav />
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
