
'use client';

import { Link } from '@lexz451/next-nprogress';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, HandCoins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/deals', label: 'Deals', icon: HandCoins },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div className="h-16 md:hidden" />
      <footer className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/60 backdrop-blur-xl md:hidden",
        isMounted && "pb-safe-bottom"
      )}>
        <nav className="grid h-16 grid-cols-3 items-center">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center justify-center gap-1"
              >
                <link.icon
                  className={cn(
                    'h-6 w-6',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'text-xs font-medium',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </footer>
    </>
  );
}
