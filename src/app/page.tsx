import { Suspense } from 'react';
import Link from 'next/link';
import { HeroCarousel } from '@/components/course/hero-carousel';
import { GoodLuckButton } from '@/components/course/good-luck-button';
import { FieldReports } from '@/components/course/field-reports';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 mt-6 mb-8 flex justify-between items-center">
        <div>
          <div className="text-[10px] font-mono text-cyber-mute mb-1 tracking-widest">OPERATOR: 99-AZ</div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white leading-none">
            The<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Architect</span>
          </h1>
        </div>
        <div className="w-12 h-12 rounded-full border border-white/10 p-1 relative glass-card">
          <img src="https://i.pinimg.com/736x/34/3a/88/343a88de73dbe4c48aa1bb9ca4e41abc.jpg" className="w-full h-full rounded-full grayscale object-cover" alt="Profile" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-void rounded-full"></div>
        </div>
      </header>

      <main className="flex-1">
        <HeroCarousel />

        <section className="px-6 mb-12">
          <GoodLuckButton />
        </section>

        <FieldReports />

        <div className="px-6 mt-8 mb-8">
          <Link href="/how-to-pay" className="glass-card rounded-2xl p-4 text-center shadow-[inset_0_0_20px_rgba(34,197,94,0.15)] border-green-500/30 hover:bg-white/5 transition-colors cursor-pointer block">
            <div className="text-[9px] font-mono text-green-400 uppercase mb-2 tracking-widest">Payment</div>
            <div className="text-xs font-mono font-bold text-white drop-shadow-md">How to Access Courses</div>
          </Link>
        </div>
      </main>
    </div>
  );
}
