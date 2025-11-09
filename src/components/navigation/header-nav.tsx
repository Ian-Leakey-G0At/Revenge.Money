/**
 * @file Defines the main header navigation for the application.
 *
 * This component includes the site logo, primary navigation links, a theme toggler,
 * and the user menu. It is designed to be sticky, remaining visible at the top of
 * the viewport as the user scrolls.
 */

"use client";
import { Link } from '@lexz451/next-nprogress';
import { ThemeToggle } from './theme-toggle';
import { Logo } from '@/components/icons';
import { Suspense } from 'react';

/**
 * An array of navigation links to be displayed in the header.
 */
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/deals', label: 'Deals' },
];

/**
 * The main header navigation component.
 *
 * It renders the site logo, a list of navigation links, the theme toggle button,
 * and the user menu. The navigation links are hidden on mobile devices and are
 * replaced by the `BottomNav` component.
 *
 * @returns {JSX.Element} The rendered header navigation.
 */
function HeaderNavContent() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function HeaderNav() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderNavContent />
    </Suspense>
  );
}
