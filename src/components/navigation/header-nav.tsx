import Link from 'next/link';
import { Search } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { UserMenu } from '@/components/navigation/user-menu';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/learn', label: 'My Learning' },
  { href: '/account', label: 'Account' },
];

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 md:gap-4">
           <Link href="/" className="mr-2 flex items-center gap-2 md:mr-6">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              RevengeLearn
            </span>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        <nav className="ml-6 hidden items-center gap-6 text-sm md:flex">
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

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          <div className="relative flex-1 max-w-xs ml-auto hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-9"
            />
          </div>
          <div className="hidden md:block">
             <ThemeToggle />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
