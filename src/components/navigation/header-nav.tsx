/**
 * @file Defines the main header navigation for the application.
 *
 * This component includes the site logo, primary navigation links, a theme toggler,
 * and the user menu. It is designed to be sticky, remaining visible at the top of
 * the viewport as the user scrolls.
 */

"use client";
import { Link } from '@lexz451/next-nprogress';
import { UserMenu } from '@/components/navigation/user-menu';
import { ThemeToggle } from './theme-toggle';
import { Logo } from '@/components/icons';

/**
 * An array of navigation links to be displayed in the header.
 */
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/account', label: 'Account' },
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
export function HeaderNav() {
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
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
