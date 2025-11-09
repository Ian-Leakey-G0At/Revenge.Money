'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function NotFoundContent() {
    const searchParams = useSearchParams();
    const videoId = searchParams.get('videoId') || 'dQw4w9WgXcQ'; // Rick Astley as default

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="w-full max-w-2xl text-center p-4">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-muted-foreground mb-8">The page you're looking for doesn't exist. But hey, enjoy this video!</p>
                <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-2xl">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                <Button asChild className="mt-8">
                    <Link href="/">Go Back Home</Link>
                </Button>
            </div>
        </div>
    );
}

export default function NotFound() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <NotFoundContent />
        </Suspense>
    );
}
