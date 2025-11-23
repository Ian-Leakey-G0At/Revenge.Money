'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AntechamberModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl?: string;
}

export function AntechamberModal({ isOpen, onClose, checkoutUrl }: AntechamberModalProps) {
  if (!isOpen) return null;

  const handleProceed = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
    onClose();
  };

  return (
    <div className={cn(
      "fixed inset-0 z-[60] bg-void/95 backdrop-blur-xl flex items-center justify-center transition-opacity duration-500",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className="w-[85%] max-w-[320px] text-center transform transition-transform duration-500 scale-100">
        <div className="w-16 h-16 rounded-full border border-vengeance-red/30 bg-vengeance-red/10 flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
          <Lock className="w-6 h-6 text-vengeance-red" />
        </div>
        <h2 className="text-xl font-extrabold uppercase tracking-widest text-white mb-2">Security Protocol</h2>
        <div className="h-[1px] w-12 bg-vengeance-red mx-auto mb-4"></div>
        <p className="text-xs text-cyber-mute leading-relaxed mb-8 font-mono">
          This intelligence is flagged as <span className="text-white">DANGEROUS</span>.
          <br /><br />
          Transactions are routed through the "Vendetta Machine" to preserve anonymity.
        </p>
        <button
          onClick={handleProceed}
          className="w-full bg-white text-black font-bold h-12 rounded-lg hover:bg-vengeance-red hover:text-white transition-colors flex items-center justify-center gap-2 mb-3 uppercase tracking-wider text-sm"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={onClose}
          className="text-[10px] text-cyber-mute uppercase tracking-widest hover:text-white transition-colors"
        >
          Abort Mission
        </button>
      </div>
    </div>
  );
}
