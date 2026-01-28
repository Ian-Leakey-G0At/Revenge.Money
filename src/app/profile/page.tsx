'use client';

import Link from 'next/link';
import { Shield, Lock, Plane, Smartphone, AlertTriangle } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="min-h-screen pb-32">
            {/* Header */}
            <header className="pt-12 px-6 mb-8 flex flex-col items-center text-center">
                <div className="flex items-center gap-6 mb-4">
                    {/* Instagram */}
                    <Link href="https://www.instagram.com/_revengemoney/" target="_blank" className="text-brand-purple/50 hover:text-brand-purple transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="17" cy="7" r="1.5" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1.3s" dur="0.15s" values="0;1" /></circle><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="72" stroke-dashoffset="72" d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0" /></path><path stroke-dasharray="28" stroke-dashoffset="28" d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" values="28;0" /></path></g></svg>
                    </Link>

                    <div className="w-24 h-24 rounded-full border-2 border-white/10 p-1 relative glass-card">
                        <img src="https://i.pinimg.com/736x/34/3a/88/343a88de73dbe4c48aa1bb9ca4e41abc.jpg" className="w-full h-full rounded-full grayscale object-cover" alt="Profile" />
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-void rounded-full animate-pulse"></div>
                    </div>

                    {/* TikTok */}
                    <Link href="https://www.tiktok.com/@revenge.money?_r=1&_t=ZM-91EIU6HbdeO" target="_blank" className="text-brand-purple/50 hover:text-brand-purple transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><mask id="SVGFiQcHeLi"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" stroke="none" d="M16.6 5.82c-0.68 -0.78 -1.06 -1.78 -1.06 -2.82h-3.09v12.4c-0.02 0.67 -0.31 1.31 -0.79 1.77c-0.48 0.47 -1.13 0.73 -1.8 0.73c-1.42 0 -2.6 -1.16 -2.6 -2.6c0 -1.72 1.66 -3.01 3.37 -2.48v-3.16c-3.45 -0.46 -6.47 2.22 -6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69 -2.55 5.69 -5.7v-6.29c1.25 0.9 2.76 1.38 4.3 1.38v-3.09c0 0 -1.88 0.09 -3.24 -1.48Z" /><path stroke="#000" stroke-dasharray="36" stroke-dashoffset="72" stroke-width="4" d="M11 11h-1c-2.21 0 -4.5 1.79 -4.5 4c0 2.21 1.5 4.5 4.5 4.5c2.21 0 4 -2.29 4 -4.5v-12.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;36" /></path><path stroke="#000" stroke-dasharray="10" stroke-dashoffset="20" stroke-width="4" d="M18 2.5v8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.1s" values="20;10" /></path></g></mask><rect width="24" height="24" fill="currentColor" mask="url(#SVGFiQcHeLi)" /></svg>
                    </Link>
                </div>
                <h1 className="text-xl font-extrabold uppercase tracking-widest text-white mb-1">The Architect</h1>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-vengeance-red uppercase tracking-widest">
                    <Shield className="w-3 h-3" />
                    Access Level 4: Classified
                </div>
            </header>

            {/* Stats Cards */}
            <div className="px-6 grid grid-cols-2 gap-4 mb-10">
                <Link href="/about" className="glass-card rounded-2xl p-4 text-center shadow-[inset_0_0_20px_rgba(168,85,247,0.15)] border-brand-purple/30 hover:bg-white/5 transition-colors cursor-pointer block">
                    <div className="text-[9px] font-mono text-brand-purple uppercase mb-2 tracking-widest">About</div>
                    <div className="text-xs font-mono font-bold text-white drop-shadow-md">The Architecture</div>
                </Link>
                <Link href="/how-to-pay" className="glass-card rounded-2xl p-4 text-center shadow-[inset_0_0_20px_rgba(34,197,94,0.15)] border-green-500/30 hover:bg-white/5 transition-colors cursor-pointer block">
                    <div className="text-[9px] font-mono text-green-400 uppercase mb-2 tracking-widest">Payment</div>
                    <div className="text-xs font-mono font-bold text-white drop-shadow-md">How to Access Courses</div>
                </Link>
            </div>

            {/* The Vault */}
            <main className="px-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xs font-bold text-white uppercase tracking-widest">Incoming Intel</h2>
                    <span className="text-[10px] text-cyber-mute font-mono">SECURE VAULT</span>
                </div>

                <div className="space-y-4">
                    {/* Deal 1: Negotiating */}
                    <div className="glass-card p-5 rounded-xl border-l-2 border-l-wealth-gold relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-wealth-gold animate-pulse"></span>
                                <span className="text-[10px] font-bold text-wealth-gold uppercase tracking-widest">Negotiating</span>
                            </div>
                            <Plane className="w-4 h-4 text-white/40" />
                        </div>
                        <h3 className="text-sm font-extrabold text-white uppercase mb-1">Caribbean Citizenship</h3>
                        <p className="text-[10px] text-cyber-mute leading-relaxed">
                            Direct channel to St. Kitts & Nevis passport program. Bypass standard waiting periods.
                        </p>
                    </div>

                    {/* Deal 2: Locked */}
                    <div className="glass-card p-5 rounded-xl border-l-2 border-l-white/20 relative overflow-hidden opacity-60 grayscale">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <Lock className="w-3 h-3 text-white/40" />
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Locked</span>
                            </div>
                            <Smartphone className="w-4 h-4 text-white/40" />
                        </div>
                        <h3 className="text-sm font-extrabold text-white/60 uppercase mb-1">Ghost Phone Hardware</h3>
                        <p className="text-[10px] text-white/30 leading-relaxed">
                            Custom firmware Pixel devices. GrapheneOS pre-hardened. Microphone kill-switches.
                        </p>
                    </div>

                    {/* Deal 3: Classified */}
                    <div className="glass-card p-5 rounded-xl border-l-2 border-l-vengeance-red relative overflow-hidden">
                        <div className="absolute inset-0 bg-vengeance-red/5"></div>
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3 text-vengeance-red" />
                                <span className="text-[10px] font-bold text-vengeance-red uppercase tracking-widest">Classified</span>
                            </div>
                        </div>
                        <h3 className="text-sm font-extrabold text-white uppercase mb-1 relative z-10">Emergency Exit</h3>
                        <p className="text-[10px] text-cyber-mute leading-relaxed relative z-10">
                            Private charter extraction protocols. [REDACTED] jurisdiction landing rights.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
