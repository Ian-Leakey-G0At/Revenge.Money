'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Globe, Lock, Cpu, Zap, Users, Crown } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-void text-white font-sans selection:bg-vengeance-red/30 selection:text-white pb-24">

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 h-[72px] z-40 bg-void/90 backdrop-blur-md border-b border-white/5 pl-6 pr-8 flex items-center justify-between pt-0 transition-all duration-300">
                <Link href="/profile" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition border border-white/10">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <img src="/logo/revenge_money_logo_dark_theme.png" alt="Revenge Money" className="h-12 w-auto" />
            </div>

            <main className="pt-28 px-6 max-w-2xl mx-auto">

                {/* Hero Section */}
                <section className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vengeance-red/10 border border-vengeance-red/30 text-[10px] font-mono text-vengeance-red uppercase tracking-widest mb-6 animate-pulse-slow">
                        <Shield className="w-3 h-3" />
                        <span>Manifesto Protocol</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest leading-tight mb-6">
                        The Architecture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Sovereignty</span>
                    </h1>

                    <p className="text-lg text-gray-400 italic font-serif leading-relaxed">
                        "We Are the Glitch in the System."
                    </p>
                </section>

                {/* Introduction */}
                <div className="prose prose-invert prose-sm max-w-none mb-16 space-y-6 text-gray-300 leading-relaxed">
                    <p>
                        If you have found your way here, it is likely because you have felt it. That gnawing sensation in the back of your mind that the "standard path"—go to school, get a job, buy a house, pay your taxes, retire at 65—is not a roadmap to success. It is a containment protocol.
                    </p>
                    <p>
                        You did everything right. You followed the rules. Yet, you watch as your purchasing power erodes, your privacy evaporates, and the systems you were told to trust leverage your labor for their gain.
                    </p>
                    <div className="border-l-2 border-vengeance-red pl-4 py-2 my-8 bg-vengeance-red/5 rounded-r-lg">
                        <p className="text-white font-bold text-lg uppercase tracking-wide m-0">
                            We are the alternative.
                        </p>
                    </div>
                    <p>
                        We are not financial advisors in cheap suits. We are not "gurus" renting Lamborghinis for Instagram. We are a collective of strategists, investors, and sovereign individuals who have spent decades decoding the legal, financial, and digital frameworks that the ultra-wealthy use to operate above the fray.
                    </p>
                    <p>
                        We realized that the game isn’t impossible to win—it’s just rigged. And the only way to win a rigged game is to stop playing by the rules designed for the players, and start playing by the rules written for the owners.
                    </p>
                </div>

                {/* Mission */}
                <section className="mb-20 relative">
                    <div className="absolute -inset-4 bg-gradient-to-b from-brand-purple/5 to-transparent rounded-2xl -z-10"></div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-brand-purple"></span>
                        Our Mission
                    </h2>
                    <p className="text-gray-300 mb-6">
                        To democratize the tools of the elite.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        For too long, true financial freedom—the kind that makes you immune to lawsuits, cancel culture, and economic collapse—has been gatekept behind $1,000/hour lawyers and private family offices.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Our mission is to package that high-level intelligence into an actionable blueprint. We exist to help you move from being a "Subject" (dependent on the system) to being a "Sovereign" (independent of the system).
                    </p>
                    <p className="text-white font-bold text-center mt-8 text-lg">
                        We are here to help you build a life where you own nothing, but control everything.
                    </p>
                </section>

                {/* The Protocol */}
                <section className="mb-20">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-10 text-center">
                        The Protocol <span className="text-cyber-mute text-sm block mt-1 font-normal">(Our Curriculum)</span>
                    </h2>

                    <p className="text-gray-400 text-sm text-center mb-12 max-w-md mx-auto">
                        We do not teach "how to get rich quick." We teach how to build the infrastructure that keeps you rich and free.
                    </p>

                    <div className="space-y-8">
                        {/* Stage I */}
                        <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white font-mono text-xs border border-white/10">I</div>
                                <h3 className="text-base font-bold text-white uppercase tracking-wide">The Architecture of Anonymity</h3>
                            </div>
                            <div className="pl-11">
                                <p className="text-[10px] font-mono text-brand-purple uppercase tracking-widest mb-2">The Foundation</p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    You cannot build a fortress on a public map. We teach the art of digital privacy, data removal, and the construction of operational personas. We help you reclaim the right to a private life in a surveillance economy.
                                </p>
                            </div>
                        </div>

                        {/* Stage II */}
                        <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white font-mono text-xs border border-white/10">II</div>
                                <h3 className="text-base font-bold text-white uppercase tracking-wide">Jurisdictional Arbitrage</h3>
                            </div>
                            <div className="pl-11">
                                <p className="text-[10px] font-mono text-brand-purple uppercase tracking-widest mb-2">The Expansion</p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    We challenge the notion that you are property of your birthplace. We explore the strategies of global mobility, second citizenships, and "flag theory"—planting your life in the soil where it will grow best, not just where it was dropped.
                                </p>
                            </div>
                        </div>

                        {/* Stage III */}
                        <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white font-mono text-xs border border-white/10">III</div>
                                <h3 className="text-base font-bold text-white uppercase tracking-wide">Corporate Veils & Asset Defense</h3>
                            </div>
                            <div className="pl-11">
                                <p className="text-[10px] font-mono text-brand-purple uppercase tracking-widest mb-2">The Shield</p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Wealth without protection is merely a temporary lease. We guide you through the complex world of domestic and offshore entities. This is the study of legal force fields—structures that ensure when predators come looking, they find nothing but paper walls.
                                </p>
                            </div>
                        </div>

                        {/* Stage IV */}
                        <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white font-mono text-xs border border-white/10">IV</div>
                                <h3 className="text-base font-bold text-white uppercase tracking-wide">Parallel Financial Systems</h3>
                            </div>
                            <div className="pl-11">
                                <p className="text-[10px] font-mono text-brand-purple uppercase tracking-widest mb-2">The Engine</p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    The traditional banking system is a control grid. We provide the knowledge to operate outside of it. We delve into decentralized finance, self-custody, and the creation of a personal banking infrastructure that cannot be frozen, censored, or seized.
                                </p>
                            </div>
                        </div>

                        {/* Stage V */}
                        <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white font-mono text-xs border border-white/10">V</div>
                                <h3 className="text-base font-bold text-white uppercase tracking-wide">The Efficiency of Zero</h3>
                            </div>
                            <div className="pl-11">
                                <p className="text-[10px] font-mono text-brand-purple uppercase tracking-widest mb-2">The Optimization</p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Taxes are the single largest expense in your lifetime. We explore the legal "gray zones" and international frameworks that allow you to optimize your tax burden. We move beyond "evasion" into the art of strategic "avoidance" and regulatory arbitrage.
                                </p>
                            </div>
                        </div>

                        {/* Stage VI */}
                        <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white font-mono text-xs border border-white/10">VI</div>
                                <h3 className="text-base font-bold text-white uppercase tracking-wide">The Dynasty Protocol</h3>
                            </div>
                            <div className="pl-11">
                                <p className="text-[10px] font-mono text-brand-purple uppercase tracking-widest mb-2">The Legacy</p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    A life’s work should not end with a probate court. We teach the long-game: structuring dynasty trusts and multi-generational transfer systems. This is about ensuring your values and your resources survive to protect your bloodline for centuries.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Community */}
                <section className="mb-20">
                    <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                            <Users className="w-5 h-5 text-wealth-gold" />
                            The Community
                        </h2>
                        <blockquote className="text-lg text-white font-serif italic mb-6 border-l-2 border-wealth-gold pl-4">
                            "You are the average of the five people you surround yourself with."
                        </blockquote>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            If you surround yourself with people who complain about the economy, you will be a victim of the economy. If you surround yourself with architects who are building their own economies, you will become one.
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Our community is the "Inner Circle." It is a network of silent operators—entrepreneurs, investors, and free-thinkers—who have rejected the narrative of scarcity. We share intelligence, we vet strategies, and we hold the line. When you join us, you are not buying a course; you are gaining a brotherhood.
                        </p>
                    </div>
                </section>

                {/* The Result */}
                <section className="mb-12 text-center">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-8">The Result</h2>
                    <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
                        What does it look like to finish the work? It isn't just a number in a bank account. It is a specific feeling.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <p className="text-xs text-gray-300">The feeling of waking up without an alarm, knowing your assets are working harder than you are.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <p className="text-xs text-gray-300">The peace of knowing that if a lawsuit hits, your wealth is invisible.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <p className="text-xs text-gray-300">The freedom of booking a one-way ticket to a new country, knowing you have a legal identity waiting for you there.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <p className="text-xs text-gray-300">The quiet confidence of sitting in a room, knowing you have "Fuck You" money, "Fuck You" status, and "Fuck You" freedom.</p>
                        </div>
                    </div>

                    <p className="text-xl font-bold text-white uppercase tracking-widest mb-4">
                        It is the transition from anxiety to sovereignty.
                    </p>

                    <div className="h-[1px] w-24 bg-vengeance-red mx-auto mb-6"></div>

                    <p className="text-lg text-gray-400 font-serif">
                        Welcome to the Fortress. <br />
                        <span className="text-white font-bold not-italic mt-2 block">Welcome to Revenge Money.</span>
                    </p>
                </section>

            </main>
        </div>
    );
}
