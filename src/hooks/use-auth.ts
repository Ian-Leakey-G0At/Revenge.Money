'use client';

import { useNavigation } from '@/hooks/use-navigation';

// NOTE: This is a placeholder for a real authentication implementation.
// In a real app, you would use a library like next-auth or a custom solution.

export const useAuth = () => {
  const router = useNavigation();

  const signOut = () => {
    // In a real app, you would clear the user's session here.
    console.log('Signing out (mock)...');

    // Redirect to the login page.
    router.push('/login');
  };

  return { signOut };
};
