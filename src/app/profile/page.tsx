'use client';

import { Shield, Lock, Plane, Smartphone, AlertTriangle } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-void pb-32">
            {/* Header */}
            <header className="pt-12 px-6 mb-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-white/10 p-1 relative glass-card mb-4">
                    <img src="https://i.pravatar.cc/150?img=15" className="w-full h-full rounded-full grayscale object-cover" alt="Profile" />
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-vengeance-red border-2 border-void rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-xl font-extrabold uppercase tracking-widest text-white mb-1">The Commander</h1>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-vengeance-red uppercase tracking-widest">
                    <Shield className="w-3 h-3" />
                    Access Level 4: Classified
                </div>
            </header>

            {/* Stats Cards */}
            <div className="px-6 grid grid-cols-2 gap-4 mb-10">
                <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-[9px] font-mono text-cyber-mute uppercase mb-2 tracking-widest">Loyalty Points</div>
                    <div className="text-2xl font-mono font-bold text-wealth-gold drop-shadow-md">19,576</div>
                </div>
                <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-[9px] font-mono text-cyber-mute uppercase mb-2 tracking-widest">Payment</div>
                    <div className="text-xs font-mono font-bold text-white drop-shadow-md">How to Access Courses</div>
                </div>
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
