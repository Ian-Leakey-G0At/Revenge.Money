'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

export function ComingSoonPlaceholder() {
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' 
    ? '/logo/revenge_money_logo_dark_theme.png' 
    : '/logo/revenge_money_logo_light_theme.png';

  // Define CSS keyframe animations as a string
  const animationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-subtle {
      0%, 100% { opacity: 0.15; }
      50% { opacity: 0.25; }
    }
    .animate-fadeIn {
      animation: fadeIn 1s ease-out forwards;
    }
    .animate-pulse-subtle {
      animation: pulse-subtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `;

  return (
      <>
        <style>{animationStyles}</style>
        <div className="relative flex flex-col items-center justify-center w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={logoSrc}
              alt="Revenge Money Logo"
              layout="fill"
              objectFit="cover"
              className="blur-3xl scale-125 opacity-10 dark:opacity-20 animate-pulse-subtle"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
            <h1
              className="text-6xl md:text-8xl font-black tracking-tighter text-foreground/80 animate-fadeIn"
              style={{ animationDelay: '0.2s' }}
            >
              SOON
            </h1>
            <p 
              className="mt-4 text-base md:text-lg font-light text-muted-foreground animate-fadeIn"
              style={{ animationDelay: '0.5s' }}
            >
              A new era is being forged.
            </p>
          </div>
        </div>
      </>
  );
}
