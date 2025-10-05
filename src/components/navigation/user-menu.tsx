import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreditCard, LifeBuoy, LogOut, Settings, User, UserCog } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function UserMenu() {
  // In a real app, you'd get user data from a context or session
  const user = { name: 'Test User', email: 'user@example.com' };
  const avatarImage = PlaceHolderImages.find(img => img.id === 'instructor-avatar-1');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={user.name} data-ai-hint={avatarImage.imageHint} />}
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account"><User className="mr-2" />Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account?tab=billing"><CreditCard className="mr-2" />Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account?tab=settings"><Settings className="mr-2" />Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin"><UserCog className="mr-2" />Admin</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
         <DropdownMenuItem>
          <LifeBuoy className="mr-2" />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/login"><LogOut className="mr-2" />Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
