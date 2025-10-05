import Link from 'next/link';
import { UserMenu } from '@/components/navigation/user-menu';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/learn', label: 'My Learning' },
  { href: '/account', label: 'Account' },
];

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
           <Link href="/" className="text-xl font-bold">
              Revenge Money
            </Link>
        </div>

        <div className="flex items-center gap-4">
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
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
