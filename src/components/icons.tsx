"use client";
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const src = mounted && resolvedTheme === 'dark'
      ? '/logo/revenge_money_logo_dark_theme.png'
      : '/logo/revenge_money_logo_light_theme.png';

  return (
    <Image
      src={src}
      alt="Revenge Money Logo"
      width={120}
      height={24}
    />
  );
};