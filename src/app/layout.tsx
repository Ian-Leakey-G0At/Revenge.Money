import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/components/layout/app-provider';
import { ProgressBar } from '@lexz451/next-nprogress';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'RevengeLearn',
  description: 'A secure, reliable learning platform that sells premium courses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="one-verification" content="0877fe36" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-void text-foreground relative">
        {/* Ambient Biology: Pulsating Blobs */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-vengeance-red/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
          <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-brand-cyan/5 rounded-full blur-[100px] animate-pulse-slow delay-2000"></div>
        </div>

        <AppProvider>{children}</AppProvider>
        <Toaster />
        <Suspense fallback={null}>
          <ProgressBar
            height="4px"
            color="#000000"
            options={{ showSpinner: false }}
          />
        </Suspense>
      </body>
    </html>
  );
}
