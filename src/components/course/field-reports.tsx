'use client';

import { Star } from 'lucide-react';

const REVIEWS = [
    { name: "Chris B.", loc: "Sydney, AU", initial: "C", text: "An amazing deep dive into the world of crypto. I feel like I finally understand the technology and the investment opportunities." },
    { name: "David D.", loc: "Chicago, IL", initial: "D", text: "The real estate investing module was fantastic. I now have a clear roadmap to buying my first rental property." },
    { name: "Alex", loc: "Dallas, TX", initial: "A", text: "Contradicted my manager on budgeting... practical and have made a huge difference in my savings." },
    { name: "Sarah M.", loc: "London, UK", initial: "S", text: "The privacy strategies are next level. I've completely restructured my digital footprint." },
    { name: "James K.", loc: "Toronto, CA", initial: "J", text: "Finally, actionable advice on tax minimization that isn't just generic fluff. Worth every penny." }
];

export function FieldReports() {
    return (
        <section className="pl-6 mb-24">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Field Reports</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x pr-6">
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
