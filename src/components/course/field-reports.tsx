'use client';

import { Star } from 'lucide-react';

const REVIEWS = [
    { name: "Marcus T.", loc: "Berlin, DE", initial: "M", text: "The privacy protocols are absolute. I've successfully scrubbed my digital footprint. I finally feel secure." },
    { name: "Sarah J.", loc: "New York, US", initial: "S", text: "The Architect's philosophy rewired my brain. I don't see the world the same way anymore. Pure clarity." },
    { name: "Kenji O.", loc: "Tokyo, JP", initial: "K", text: "DeFi strategies that actually work. I'm generating yield in ways I didn't know existed. No more banks." },
    { name: "Elena R.", loc: "Madrid, ES", initial: "E", text: "The AI consultant is terrifyingly good. It analyzed my portfolio and found gaps my human advisor missed." },
    { name: "David B.", loc: "London, UK", initial: "D", text: "This isn't just a course; it's an operating system for the modern age. Essential for anyone serious about sovereignty." },
    { name: "Alex K.", loc: "Moscow, RU", initial: "A", text: "Ghost in the Machine is a masterpiece. My data is mine again. The techniques are simple but effective." },
    { name: "Michael C.", loc: "Chicago, US", initial: "M", text: "Finally, a roadmap to financial independence that doesn't rely on luck. The math checks out." },
    { name: "Priya P.", loc: "Mumbai, IN", initial: "P", text: "Automating my income streams with the provided AI tools was easier than I thought. It runs itself now." },
    { name: "Tom H.", loc: "Sydney, AU", initial: "T", text: "Stop being a passenger. Start driving. That's what this taught me. My income has doubled since applying these principles." },
    { name: "Lars N.", loc: "Oslo, NO", initial: "L", text: "I used to be paranoid. Now I'm prepared. The difference is knowledge. This course gave me that." },
    { name: "Wei Z.", loc: "Singapore, SG", initial: "W", text: "Understanding the blockchain at this level is a superpower. I'm ahead of the curve for the first time." },
    { name: "Jessica L.", loc: "Toronto, CA", initial: "J", text: "Revenge Money isn't about anger; it's about success. The best revenge is massive success. And I'm getting there." }
];

export function FieldReports() {
    return (
        <section className="pl-6 mb-24 relative">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Field Reports</h2>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x pr-6 relative z-10 [mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
                {REVIEWS.map((r, i) => (
                    <div key={i} className="snap-center shrink-0 w-[280px] glass-card p-4 rounded-xl border-l-2 border-white/10">
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 text-brand-purple fill-brand-purple" />
                            ))}
                        </div>
                        <p className="text-xs text-cyber-mute italic mb-3 leading-relaxed line-clamp-3">"{r.text}"</p>
                        <div className="flex justify-between items-center border-t border-white/5 pt-2">
                            <span className="text-[10px] font-bold text-white uppercase tracking-wide">{r.name}</span>
                            <span className="text-[9px] font-mono text-cyber-mute">{r.loc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
