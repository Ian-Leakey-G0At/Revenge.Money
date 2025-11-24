'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function HowToPayPage() {
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

                    {/* Zoomable Image Card */}
                    <div className="glass-card bg-void/80 backdrop-blur-xl border border-white/10 rounded-xl p-1 overflow-hidden shadow-2xl relative">
                        <div className="relative aspect-[9/21] w-full bg-black/50 rounded-lg overflow-hidden">
                            <TransformWrapper
                                initialScale={1}
                                minScale={1}
                                maxScale={4}
                                centerOnInit
                            >
                                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Payment Instructions"
                                        className="w-full h-full object-cover"
                                    />
                                </TransformComponent>
                            </TransformWrapper>
                        </div>
                    </div>

                    <p className="text-[10px] text-center text-white/30 mt-4 font-mono">
                        PINCH TO ZOOM INSTRUCTIONS
                    </p>
                </div>
            </main>
        </div>
    );
}
