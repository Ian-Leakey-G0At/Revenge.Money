'use client';

'use client';

import { useState, useEffect } from 'react';
import { Clover } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

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
  const [showPopup, setShowPopup] = useState(false);
  const [currentMantra, setCurrentMantra] = useState("");

  const triggerLuck = () => {
    setCount((prev) => prev + 1);
    const randomMantra = WEALTH_MANTRAS[Math.floor(Math.random() * WEALTH_MANTRAS.length)];
    setCurrentMantra(randomMantra);
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50) {
      setShowPopup(false);
    }
  };

  return (
    <>
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

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="fixed bottom-24 left-1/2 z-[60] w-[90%] max-w-md"
          >
            <div className="bg-void-depth border border-wealth-gold/20 text-white p-4 rounded-lg shadow-2xl flex flex-col items-center text-center backdrop-blur-xl">
              <div className="text-sm font-bold text-wealth-gold mb-1 uppercase tracking-widest">Fortune Protocol Engaged</div>
              <div className="text-lg">{currentMantra}</div>
              <div className="text-[9px] text-cyber-mute mt-2 font-mono">SWIPE TO DISMISS</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
