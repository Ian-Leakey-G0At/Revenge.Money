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
      <body className="font-sans antialiased bg-void text-foreground">
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
