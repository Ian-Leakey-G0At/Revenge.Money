'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, Settings } from 'lucide-react';

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
    href: '/account',
    icon: User,
    label: 'Account',
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Settings',
  },
];

/**
 * The primary bottom navigation component for mobile devices.
 * It is hidden on larger screens.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="container mx-auto grid h-16 max-w-lg grid-cols-4 px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex flex-col items-center justify-center gap-1 text-sm font-medium"
          >
            <item.icon
              className={cn(
                'h-6 w-6',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            />
            <span
              className={cn(
                'text-xs',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
