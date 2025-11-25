'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button } from '@/components/ui/button';

const IMAGES = [
    '/howtopay/process_1.png',
    '/howtopay/process_2.png',
    '/howtopay/process_3.png',
    '/howtopay/process_4.png',
];

export default function HowToPayPage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    };

    return (
        <div className="min-h-screen relative overflow-hidden volumetric-bg pb-20">
            {/* Ambient Biology: Pulsating Blobs (Consistent with Course Page) */}
            <div className="absolute inset-0 z-[-1] pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-vengeance-red/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            </div>

            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 h-[72px] z-40 bg-void/90 backdrop-blur-md border-b border-white/5 pl-6 pr-8 flex items-center justify-between pt-0 transition-all duration-300">
                <Link href="/profile" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition border border-white/10">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <img src="/logo/revenge_money_logo_dark_theme.png" alt="Revenge Money" className="h-12 w-auto" />
            </div>

            {/* Main Content */}
            <main className="px-6 pt-24 pb-10 flex flex-col items-center">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-extrabold uppercase text-white tracking-widest mb-2">Payment Protocol</h1>
                        <p className="text-xs text-cyber-mute font-mono">SECURE TRANSACTION GUIDE</p>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative group">
                        {/* Zoomable Image Card */}
                        <div className="glass-card bg-void/80 backdrop-blur-xl border border-white/10 rounded-xl p-1 overflow-hidden shadow-2xl relative z-10">
                            <div className="relative aspect-[9/21] w-full bg-black/50 rounded-lg overflow-hidden">
                                <TransformWrapper
                                    initialScale={1}
                                    minScale={1}
                                    maxScale={4}
                                    centerOnInit
                                >
                                    <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                                        <img
                                            key={currentIndex} // Force re-render on change to reset zoom
                                            src={IMAGES[currentIndex]}
                                            alt={`Payment Instruction ${currentIndex + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            </div>
                        </div>

                        {/* Navigation Buttons - Absolute positioned relative to the card container */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrev}
                            className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-brand-purple hover:text-white backdrop-blur-sm transition-all shadow-lg"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleNext}
                            className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-brand-purple hover:text-white backdrop-blur-sm transition-all shadow-lg"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>

                    <p className="text-[10px] text-center text-white/30 mt-4 font-mono">
                        PINCH TO ZOOM • USE ARROWS TO NAVIGATE
                    </p>
                </div>
            </main>
        </div>
    );
}
