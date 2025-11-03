'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, HandCoins } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Defines the navigation items for the bottom navigation bar.
 */
const navItems = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/courses',
    icon: BookOpen,
    label: 'Courses',
  },
  {
    href: '/deals',
    icon: HandCoins,
    label: 'Deals',
  },
];

/**
 * The primary bottom navigation component for mobile devices.
 * It is hidden on larger screens.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <nav className="border-t bg-background/95 backdrop-blur-sm">
        <div className="grid grid-cols-3 h-16 items-center">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-sm font-medium',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground/80',
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
