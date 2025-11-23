'use client';

import { useState } from 'react';
import { Clover } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const WEALTH_MANTRAS = [
  "Money magnet activated! 🧲",
  "Fortune favors the bold. 🦁",
  "Abundance is your birthright. 👑",
  "The universe is conspiring for you. ✨",
  "Wealth flows to you effortlessly. 🌊",
  "Your financial sovereignty is inevitable. 🛡️",
  "Luck is just preparation meeting opportunity. 🤝",
  "You are the architect of your reality. 🏗️"
];

export function GoodLuckButton() {
  const [count, setCount] = useState(19576);
  const { toast } = useToast();

  const triggerLuck = () => {
    setCount((prev) => prev + 1);
    const randomMantra = WEALTH_MANTRAS[Math.floor(Math.random() * WEALTH_MANTRAS.length)];

    toast({
      title: "Fortune Protocol Engaged",
      description: randomMantra,
      className: "bg-void-depth border-wealth-gold/20 text-white",
    });
  };

  return (
    <button
      onClick={triggerLuck}
      className="w-full glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-wealth-gold/50 transition-colors duration-500 text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-wealth-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative z-10 flex justify-between items-end">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <Clover className="w-4 h-4 text-wealth-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-wealth-gold">Fortune Protocol</span>
          </div>
          <div className="text-4xl font-mono font-bold text-white tracking-tighter" id="luck-counter">
            {count.toLocaleString()}
          </div>
        </div>
        <div className="text-[10px] text-cyber-mute font-mono text-right opacity-60">
          TAPS FOR<br />GOOD LUCK
        </div>
      </div>
    </button>
  );
}
