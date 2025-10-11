'use client';

import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

export const useNavigation = () => {
  const router = useRouter();

  const push = (href: string) => {
    NProgress.start();
    router.push(href);
  };

  const replace = (href: string) => {
    NProgress.start();
    router.replace(href);
  };

  const back = () => {
    NProgress.start();
    router.back();
  };

  const forward = () => {
    NProgress.start();
    router.forward();
  };

  return { ...router, push, replace, back, forward };
};
